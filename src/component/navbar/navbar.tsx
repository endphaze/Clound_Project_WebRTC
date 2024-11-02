import './styles.css'
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { useNavigate } from 'react-router-dom';


export const Navbar=()=>{
    const navigate = useNavigate()

    const handleLoginClick = () => {
        navigate('/login'); //ไปที่ path /login
    };
    const handleSignUpClick =()=>{
        navigate('/signup');
    }
    const handleindexClick =()=>{
        navigate('/');
    }
    return (
        <AppBar className='Navbar' position="static" >
            <Toolbar className='Toolbar'>
                <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                    <OndemandVideoIcon onClick={handleindexClick} sx={{ fontSize: 40 }} />
                </IconButton>
                <Typography variant="h4" component='div' sx={{ ml: 1,fontWeight: 'bold' }}/*ช่องว่าง*/>
                    Video Conferencing
                </Typography>

                <Stack direction='row' spacing={2} sx={{ marginLeft: 'auto' }}>
                <Button onClick={handleLoginClick} className='buttonlog' variant="contained">Login</Button>
                <Button onClick={handleSignUpClick} className='buttonsign' variant="contained">Sign Up</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}