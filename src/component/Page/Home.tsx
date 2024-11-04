import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ForumIcon from '@mui/icons-material/Forum';
import { useNavigate } from 'react-router-dom';
import pic from "../../assets/Home.png"

export const Home = () => {

    const navigate = useNavigate()
    const handleMeetingClick=()=>{
        navigate('/Home/Meeting')
    }
    const handleScheduleClick=()=>{
        navigate('/Home/Schedule')
    }
    const handleHomeClick=()=>{
        navigate('/Home')
    }
    const handleJoinClick=()=>{
        navigate('/Home/join')
    }
    const handleChatClick=()=>{
        navigate('/Home/Chat')
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20, paddingTop:7 }}>
            {/* Left section with buttons */}
            <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: 500, width: '100%' }}>
                
                {/* Create Room Meet */}
                <Button
                    onClick={handleMeetingClick}
                    variant="contained"
                    sx={{
                        backgroundColor: '#ff7b7b',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '30px',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '&:hover': { backgroundColor: '#ff5252' },
                    }}
                >
                    <VideoCallIcon sx={{ fontSize: 50 }} />
                    <Typography>Create Room Meet</Typography>
                </Button>

                {/* Join Meeting */}
                <Button
                onClick={handleJoinClick}
                    variant="contained"
                    sx={{
                        backgroundColor: '#7bb3ff',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '30px',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '&:hover': { backgroundColor: '#5393ff' },
                    }}
                >
                    <PersonAddIcon sx={{ fontSize: 50 }} />
                    <Typography>Join Meeting</Typography>
                </Button>

                {/* Schedule Meet */}
                <Button
                    onClick={handleScheduleClick}
                    variant="contained"
                    sx={{
                        backgroundColor: '#7bc77b',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '30px',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '&:hover': { backgroundColor: '#57a657' },
                    }}
                >
                    <EventAvailableIcon sx={{ fontSize: 50 }} />
                    <Typography>Schedule Meet</Typography>
                </Button>

                {/* Chat Room Meet */}
                <Button
                    variant="contained"
                    onClick={handleChatClick}
                    sx={{
                        backgroundColor: '#7b7b7b',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '30px',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '&:hover': { backgroundColor: '#5c5c5c' },
                    }}
                >
                    <ForumIcon sx={{ fontSize: 50 }} />
                    <Typography>Chat Room Meet</Typography>
                </Button>
            </Box>

            {/* Right section with a single image */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Box
                    component="img"
                    src={pic}
                    alt="Video Call Illustration"
                    sx={{ maxWidth: '100%', height: 'auto' }}
                />
            </Box>
        </Box>
    );
};
