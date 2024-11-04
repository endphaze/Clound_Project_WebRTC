import { Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import pic from "../../assets/SIGNUP.png"
export const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // ใช้ useNavigate เพื่อเปลี่ยนเส้นทาง

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/signup', {
                username,
                password
            });
            setMessage(response.data.message);

            // ถ้าสมัครสมาชิกสำเร็จ เปลี่ยนเส้นทางไปหน้า /login
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            setMessage('Error creating user');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: 2,
                gap: 4,
            }}
        >
            {/* คอลัมน์ซ้าย: รูปภาพและคำบรรยาย */}
            <Box
                sx={{
                    textAlign: 'center',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center' },
                    marginLeft: { md: '10%' }
                }}
            >
                <Box
                    component="img"
                    src={pic}
                    alt="Sign Up Illustration"
                    sx={{ width: '70%', maxWidth: 300, marginBottom: 2 }}
                />
                <Typography variant="subtitle1" sx={{ fontStyle: 'italic', color: '#555' }}>
                    “Meeting with your class <br /> Meeting with your team”
                </Typography>
            </Box>

            {/* คอลัมน์ขวา: แบบฟอร์ม Sign Up */}
            <Box
                sx={{
                    flex: 1,
                    backgroundColor: 'white',
                    padding: 4,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: 2,
                    maxWidth: 400,
                    marginRight: { md: '15%' }
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2, textAlign: 'center' }}>
                    Sign Up
                </Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: '#fb9375',
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: 2,
                        '&:hover': {
                            backgroundColor: '#e57373',
                        },
                    }}
                    onClick={handleSignUp}
                >
                    Sign Up
                </Button>
                {message && (
                    <Typography variant="subtitle1" color="error" align="center" sx={{ marginTop: 2 }}>
                        {message}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default SignUp;
