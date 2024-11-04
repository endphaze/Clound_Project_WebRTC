import { Box, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";

export const MeetingWithus=()=>{
    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate('/Home'); //ไปที่ path /
    };
    return(
        <Box 
        sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: 4,
            gap: 2,
            borderRadius: 2,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            maxWidth: 500,
            margin: 'auto',
            mt: 4
        }}
    >

            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fb9375', mb: 2 }}>
                Meeting with us
            </Typography>


            <TextField
                variant="outlined"
                placeholder="Meeting ID Room: 777 999 888"
                fullWidth
                slotProps={{
                    input: {
                        style: {
                            borderRadius: '30px',
                        },
                    },
                }}
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                    variant="outlined"
                    onClick={handleCancelClick}
                    sx={{
                        borderRadius: '20px',
                        padding: '10px 20px',
                        fontWeight: 'bold',
                        color: '#555',
                        borderColor: '#555',
                    }}
                >CANCEL</Button>

                <Button
                    variant="contained"
                    sx={{
                        borderRadius: '20px',
                        padding: '10px 20px',
                        fontWeight: 'bold',
                        backgroundColor: '#fb9375',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#e57373',
                        },
                    }}
                >JOIN</Button>
            </Box>








    </Box>
    )

}