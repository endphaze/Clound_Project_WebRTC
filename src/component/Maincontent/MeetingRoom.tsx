import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Button, IconButton, Avatar } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import io from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';

const socket = io('http://localhost:3001');

interface Participant {
    id: string;
    username: string;
}

const MeetingRoom = () => {
    const { meetingId } = useParams<{ meetingId: string }>();
    const navigate = useNavigate();
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);
    const username = localStorage.getItem('username') || 'Guest';

    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnection = useRef<RTCPeerConnection | null>(null);

    useEffect(() => {
        const initializePeerConnection = async () => {
            peerConnection.current = new RTCPeerConnection({
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
            });

            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            stream.getTracks().forEach(track => {
                peerConnection.current?.addTrack(track, stream);
            });

            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }

            peerConnection.current.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit('webrtc-ice-candidate', {
                        meetingId,
                        candidate: event.candidate,
                    });
                }
            };

            peerConnection.current.ontrack = (event) => {
                const [stream] = event.streams;
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = stream;
                }
            };

            console.log("Joining meeting:", meetingId, "with username:", username);
            socket.emit('join-meeting', { meetingId, username });
        };

        initializePeerConnection();

        socket.on('update-participants', (users: Participant[]) => {
            setParticipants(users);
        });

        socket.on('webrtc-offer', async (data) => {
            if (peerConnection.current) {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
                const answer = await peerConnection.current.createAnswer();
                await peerConnection.current.setLocalDescription(answer);
                socket.emit('webrtc-answer', { meetingId, answer });
            }
        });

        socket.on('webrtc-answer', async (data) => {
            if (peerConnection.current) {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
            }
        });

        socket.on('webrtc-ice-candidate', (data) => {
            if (peerConnection.current) {
                peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
            }
        });

        return () => {
            socket.emit('leave-meeting', { meetingId, username });
            socket.disconnect();
            peerConnection.current?.close();
        };
    }, [meetingId, username]);

    const handleLeave = () => {
        socket.emit('leave-meeting', { meetingId, username });
        socket.disconnect();
        navigate('/');
    };

    const toggleVideo = () => setIsVideoOn(!isVideoOn);
    const toggleMic = () => setIsMicOn(!isMicOn);

    useEffect(() => {
        const setupMediaStream = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            stream.getTracks().forEach(track => {
                peerConnection.current?.addTrack(track, stream);
            });
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
        };
        setupMediaStream();
    }, []);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            backgroundColor: '#333',
            color: 'white',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 2
        }}>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                gap: 2,
                padding: 2,
                flex: 1,
            }}>
                {participants.map((participant) => (
                    <Box key={participant.id} sx={{
                        width: '45%',
                        height: 'auto',
                        maxWidth: 300,
                        backgroundColor: '#444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}>
                        {/* วิดีโอ */}
                        <video
                            ref={participant.username === username ? localVideoRef : remoteVideoRef}
                            autoPlay
                            muted
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                            }}
                        />

                        {/* Avatar และชื่อผู้ใช้ */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 1,
                            width: '100%',
                            backgroundColor: '#333',
                        }}>
                            <Avatar sx={{ width: 40, height: 40, bgcolor: '#1976d2' }}>
                                {participant.username[0]}
                            </Avatar>
                            <Typography variant="body1" sx={{ marginLeft: 1 }}>
                                {participant.username}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                paddingY: 1,
                backgroundColor: '#222'
            }}>
                <IconButton color="inherit" onClick={toggleMic}>
                    {isMicOn ? <MicIcon /> : <MicOffIcon />}
                </IconButton>
                <IconButton color="inherit" onClick={toggleVideo}>
                    {isVideoOn ? <VideocamIcon /> : <VideocamOffIcon />}
                </IconButton>
                <IconButton color="inherit">
                    <ChatIcon />
                </IconButton>
                <IconButton color="inherit">
                    <SettingsIcon />
                </IconButton>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<ExitToAppIcon />}
                    onClick={handleLeave}
                    sx={{ fontWeight: 'bold' }}
                >
                    Leave
                </Button>
            </Box>
        </Box>
    );
};

export default MeetingRoom;
