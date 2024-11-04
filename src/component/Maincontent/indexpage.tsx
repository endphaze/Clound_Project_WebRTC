import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Content1stPage = () => {
    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate('/signup'); //ไปที่ path /login
    };
    const handleLoginClick = () => {
        navigate('/login'); //ไปที่ path /login
    };

    return (
        <Box sx={{ display: 'flex', padding: 4, gap: 2 }}>
            
            {/* ฝั่งซ้าย */}
            <Box sx={{ flex: 1, borderRadius: 2, padding: 2 }}>
            <Typography variant="h4" sx={{ color: '#fb9375', fontWeight: 'bold' }}>
                    Properties of video conference
                </Typography>
                <Box sx={{ mt: 2, mb: 4, padding: 2, backgroundColor: '#e0e0e0', borderRadius: 1, height: 500 }}>
                    {/* ใส่รูป */}
                </Box>
                <Box>
                    <Button variant="contained" 
                            onClick={handleSignupClick}
                            sx={{ backgroundColor: '#fb9375', marginRight: 2 , fontWeight: 'bold', padding: '12px 24px', fontSize: '1.1rem' }}>
                        Get started
                    </Button>
                    <Button variant="contained" 
                            onClick={handleLoginClick}
                            sx={{ backgroundColor: '#fb9375', fontWeight: 'bold', padding: '12px 24px', fontSize: '1.1rem' }}>
                        Join Meeting
                    </Button>
                </Box>
                
            </Box>

            {/* ฝั่งขวา */}
            <Box 
            component="img" 
            src="https://cdn.discordapp.com/attachments/1266951871713775712/1302025009484529664/1stpagePic.PNG?ex=67269cc8&is=67254b48&hm=15969f6da9f5f91f5f20f26c19c5b0061b5d8076c4ec00f9a03b73193b83da37&"
            alt="Description of the image"
            width="45%"

      
            />
        </Box>
    );
};
