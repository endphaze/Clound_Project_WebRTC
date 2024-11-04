import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        console.log("Joining meeting:", meetingId, "with username:", username);
        
        // เข้าร่วมห้องประชุมผ่าน Socket.io และส่งข้อมูลชื่อผู้ใช้ไปให้ผู้ใช้คนอื่น
        socket.emit('join-meeting', { meetingId, username });

        // เมื่อ component ถูก unmount
        return () => {
            console.log("Leaving meeting:", meetingId, "with username:", username);
            socket.emit('leave-meeting', { meetingId, username });
            socket.disconnect();  // ทำการ disconnect socket
        };
    }, [meetingId, username]);

    // ติดตั้งการฟังการอัปเดต participants ให้ทำงานตลอดเวลา
    useEffect(() => {
        // ฟังการอัปเดตรายชื่อผู้เข้าร่วมจาก server และอัปเดต state
        socket.on('update-participants', (users: Participant[]) => {
            console.log("Participants updated from server:", users); // ตรวจสอบการอัปเดตของ participants
            setParticipants(users);
        });

        // ทำความสะอาด listener เมื่อ component ถูก unmount เพื่อป้องกัน memory leak
        return () => {
            socket.off('update-participants');
        };
    }, []);

    // ฟังก์ชันสำหรับปุ่มออกจากห้อง
    const handleLeave = () => {
        console.log("User clicked Leave button");
        socket.emit('leave-meeting', { meetingId, username });
        socket.disconnect();  // ปิดการเชื่อมต่อ socket อย่างชัดเจน
        navigate('/'); // เปลี่ยนเส้นทางเมื่อออกจากห้อง
    };

    const toggleVideo = () => setIsVideoOn(!isVideoOn);
    const toggleMic = () => setIsMicOn(!isMicOn);

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
            {/* ส่วนแสดงผู้เข้าร่วม */}
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
                        height: '45%',
                        maxWidth: 300,
                        maxHeight: 200,
                        backgroundColor: '#444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                    }}>
                        <Avatar sx={{ width: 60, height: 60, bgcolor: '#1976d2' }}>
                            {participant.username[0]}
                        </Avatar>
                        <Typography variant="body1" sx={{ marginLeft: 1 }}>
                            {participant.username}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* แถบควบคุมที่ด้านล่าง */}
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
