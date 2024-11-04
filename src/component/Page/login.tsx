import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/login', {
                username,
                password
            });
            if (response.status === 200) {
                // บันทึก token ใน Local Storage
                localStorage.setItem('token', response.data.token); 
                // เปลี่ยนเส้นทางไปที่หน้า Home
                navigate('/home');
            }
        } catch (error) {
            const err = error as any; // แคสต์ error เป็น any เพื่อข้ามการตรวจสอบประเภท
        
            if (err.response && err.response.status === 401) {
                setMessage('Invalid username or password');
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                {/* Password Field */}
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* ปุ่ม Sign in */}
                <Button 
                    variant="contained" 
                    fullWidth 
                    onClick={handleLogin}
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

                {message && (
                    <Typography variant="subtitle1" color="error" align="center" sx={{ marginTop: 2 }}>
                        {message}
                    </Typography>
                )}

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

export default Login;
