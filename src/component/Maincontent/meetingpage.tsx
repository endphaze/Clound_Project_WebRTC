import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import pic from "../../assets/Meeting.png"

export const MeetingPage = () => {
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [meetingId, setMeetingId] = useState('');
    const [meetingName, setMeetingName] = useState('');

    // ฟังก์ชันเปิด Dialog
    const handleStartMeetingClick = () => {
        setDialogOpen(true);
    };

    // ฟังก์ชันปิด Dialog
    const handleDialogClose = () => {
        setDialogOpen(false);
        setMeetingId('');
        setMeetingName('');
    };

    // ฟังก์ชันสำหรับสร้างห้องประชุม
    const handleCreateMeeting = () => {
        const username = localStorage.getItem('username'); // ดึง username จาก Local Storage
        if (meetingId && meetingName && username) {
            // ส่งข้อมูลการสร้างห้องไปยัง backend
            axios.post('http://localhost:3001/create-meeting', {
                meetingId,
                meetingName,
                ownerRoom: username,
            })
            .then(response => {
                console.log('Meeting created:', response.data);
                setDialogOpen(false); // ปิด Dialog หลังจากสร้างห้องสำเร็จ
                navigate(`/Home/Meeting/${meetingId}`); // ไปที่ห้องประชุมใหม่
            })
            .catch(error => {
                console.error('Error creating meeting:', error);
            });
        }
    };

    // ฟังก์ชันสำหรับเข้าร่วมการประชุม
    const handleJoinClick = () => {
        navigate('/Home/join');
    };

    return (
        <Box sx={{ width: '100%', padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
                <Box
                    component="img"
                    src={pic}
                    alt="Meeting"
                    sx={{
                        width: { xs: '100%', md: '50%' },
                        maxWidth: 500,
                        height: 'auto',
                        borderRadius: 2,
                    }}
                />

                <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Video Conferencing
                    </Typography>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleStartMeetingClick}
                        sx={{
                            backgroundColor: '#1976d2',
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '10px',
                            fontSize: '1rem',
                            marginBottom: 2,
                            maxWidth: 200,
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                        }}
                    >
                        START MEETING
                    </Button>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleJoinClick}
                        sx={{
                            backgroundColor: '#1976d2',
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '10px',
                            fontSize: '1rem',
                            maxWidth: 200,
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                        }}
                    >
                        JOIN MEETING
                    </Button>
                </Box>
            </Box>

            {/* Dialog สำหรับการสร้างห้องประชุม */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Enter Meeting Details</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Meeting ID"
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        value={meetingId}
                        onChange={(e) => setMeetingId(e.target.value)}
                    />
                    <TextField
                        label="Meeting Name"
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        value={meetingName}
                        onChange={(e) => setMeetingName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateMeeting} color="primary" variant="contained">
                        Create Meeting
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
