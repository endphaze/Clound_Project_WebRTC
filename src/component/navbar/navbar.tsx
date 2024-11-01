import './styles.css'
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';


export const Navbar=()=>{
    return (
        <AppBar className='Navbar' position="static" >
            <Toolbar className='Toolbar'>
                <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                    <OndemandVideoIcon sx={{ fontSize: 40 }} />
                </IconButton>
                <Typography variant="h4" component='div' sx={{ ml: 1  }}/*ช่องว่าง*/>
                    Video Conferencing
                </Typography>

                <Stack direction='row' spacing={2} sx={{ marginLeft: 'auto' }}>
                <Button className='buttonlog' variant="contained">Login</Button>
                <Button className='buttonsign' variant="contained">Sign Up</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}