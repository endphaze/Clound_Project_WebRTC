import { AppBar, Button, IconButton, Stack, Toolbar, Typography, Avatar } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Menubar = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string | null>(null);

    // ฟังก์ชัน Logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // ลบ token ออกจาก Local Storage
        localStorage.removeItem('username'); // ลบ username ออกจาก Local Storage
        navigate('/login'); // เปลี่ยนเส้นทางไปที่หน้า Login
    };

    // ดึงข้อมูลชื่อผู้ใช้จาก Local Storage หรือ API
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        
        if (storedUsername) {
            // ถ้ามี username ใน Local Storage ให้ใช้ทันที
            setUsername(storedUsername);
        } else {
            // ถ้าไม่มี username ใน Local Storage ให้ตรวจสอบ token แล้วเรียก API
            const token = localStorage.getItem('token');
            if (token) {
                axios.get('http://localhost:3001/getUser', {
                    headers: {
                        Authorization: token
                    }
                }).then(response => {
                    setUsername(response.data.username); // ตั้งค่า username จาก API
                    localStorage.setItem('username', response.data.username); // เก็บ username ที่ดึงจาก API ลงใน Local Storage
                }).catch(() => {
                    setUsername('Guest'); // หากเกิดข้อผิดพลาด ให้แสดงเป็น Guest
                });
            } else {
                navigate('/login'); // หากไม่มี token ให้กลับไปที่หน้า Login
            }
        }
    }, [navigate]);

    // ฟังก์ชันสำหรับเปลี่ยนหน้า
    const handleMeetingClick = () => navigate('/Home/Meeting');
    const handleScheduleClick = () => navigate('/Home/Schedule');
    const handleHomeClick = () => navigate('/Home');
    const handleChatClick = () => navigate('/Home/Chat');

    return (
        <AppBar className='Navbar' position="static">
            <Toolbar className='Toolbar'>
                {/* โลโก้และชื่อแอป */}
                <IconButton size="large" edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }}>
                    {/* ใส่ไอคอนโลโก้ได้ที่นี่ถ้าต้องการ */}
                </IconButton>
                <Typography variant="h5" component="div" sx={{ ml: 1, fontWeight: 'bold' }}>
                    Video Conferencing
                </Typography>

                {/* เมนูปุ่ม */}
                <Stack direction="row" spacing={2} sx={{ flexGrow: 1, ml: 4 }}>
                    <Button onClick={handleHomeClick} variant="text" color="inherit" sx={{ fontWeight: 'bold' }}>
                        HOME
                    </Button>
                    <Button onClick={handleMeetingClick} variant="text" color="inherit" sx={{ fontWeight: 'bold' }}>
                        MEETINGS
                    </Button>
                    <Button onClick={handleChatClick} variant="text" color="inherit" sx={{ fontWeight: 'bold' }}>
                        CHATS
                    </Button>
                    <Button onClick={handleScheduleClick} variant="text" color="inherit" sx={{ fontWeight: 'bold' }}>
                        SCHEDULE
                    </Button>
                </Stack>

                {/* ชื่อผู้ใช้และรูป Avatar */}
                <Typography variant="body1" sx={{ mr: 2, fontWeight: 'bold' }}>
                    {username || 'Guest'} {/* แสดงชื่อผู้ใช้ หรือ 'Guest' หากไม่พบ */}
                </Typography>
                <Avatar sx={{ bgcolor: '#1976d2' }}>{username ? username[0] : ''}</Avatar>

                <Button onClick={handleLogout} color="inherit" sx={{ fontWeight: 'bold', ml: 2 }}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Menubar;
