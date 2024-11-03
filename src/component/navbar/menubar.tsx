import { AppBar, Button, IconButton, Stack, Toolbar, Typography, Avatar } from "@mui/material";
import { useNavigate } from 'react-router-dom';
export const Menubar = () => {
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
    const handleChatClick=()=>{
        navigate('/Home/Chat')
    }
    
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
                    CowanSoodLorr
                </Typography>
                <Avatar sx={{ bgcolor: '#1976d2' }}></Avatar>
            </Toolbar>
        </AppBar>
    );
};

export default Menubar;
