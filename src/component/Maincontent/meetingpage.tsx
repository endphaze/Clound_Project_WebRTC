import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const MeetingPage = () => {
    const navigate = useNavigate();

    const handleJoinClick = () => {
        navigate('/join'); //ไปที่ path 
    };
    return (
        <Box sx={{ width: '100%', padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* ส่วนหลักแบ่งเป็นสองคอลัมน์ */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
                {/* คอลัมน์ซ้าย: รูปภาพ */}
                <Box
                    component="img"
                    src="https://cdn.discordapp.com/attachments/1266951871713775712/1302321513147666492/Meeting.PNG?ex=6727b0ec&is=67265f6c&hm=ec28cf72bee0c756b4d92587ca24dacc63e4555b90eca8563169340b7cdec446&" // URL ของรูปภาพที่คุณต้องการ
                    alt="Meeting"
                    sx={{
                        width: { xs: '100%', md: '50%' }, // ปรับขนาดให้เหมาะกับหน้าจอใหญ่และเล็ก
                        maxWidth: 500,
                        height: 'auto',
                        borderRadius: 2,
                    }}
                />

                {/* คอลัมน์ขวา: ข้อความและปุ่ม */}
                <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Video Conferencing
                    </Typography>

                    <Button
                        variant="contained"
                        fullWidth
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
        </Box>
    );
};

