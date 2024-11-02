import React from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: 2,
            }}
        >
            {/* หัวข้อ Sign In */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                Sign In
            </Typography>

            {/* กล่องแบบฟอร์ม Sign In */}
            <Box 
                sx={{
                    width: 300,
                    padding: 4,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: 2,
                    backgroundColor: 'white',
                }}
            >
                {/* Username Field */}
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />

                {/* Password Field */}
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                />

                {/* ปุ่ม Sign in */}
                <Button 
                    variant="contained" 
                    fullWidth 
                    sx={{
                        backgroundColor: '#fb9375',
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: 2,
                        marginBottom: 2,
                        '&:hover': {
                            backgroundColor: '#e57373',
                        },
                    }}
                >
                    Sign in
                </Button>

                {/* ลิงก์ Sign up */}
                <Box sx={{ textAlign: 'center', mt: 1 }}>
                    <Link underline="hover" sx={{ fontSize: '0.9rem', color: '#555' }} onClick={handleSignUpClick}>
                        Sign up ?
                    </Link>
                </Box>
            </Box>

            {/* ข้อความเพิ่มเติมด้านล่าง */}
            <Typography variant="caption" sx={{ color: '#aaa', mt: 4, textAlign: 'center' }}>
                “you can sign up if you cannot sign in”
            </Typography>
        </Box>
    );
};
