import './styles.css'
import { AppBar,Toolbar, Typography } from "@mui/material";

export const Buttonbar=()=>{
    return (
        <AppBar className='Buttonbar' position="static">
            <Toolbar className='Toolbar2'>
                <Typography className='Text-botton'>Presented For Clound Project</Typography>
            </Toolbar>
        </AppBar>
    )
}