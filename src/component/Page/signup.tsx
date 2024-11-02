import { Box, Typography, TextField, Button } from '@mui/material';

export const SignUp = () => {
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
                    alignItems: { xs: 'center'}, 
                    marginLeft: { md: '10%' } // เพิ่ม marginLeft เพื่อให้รูปชิดซ้ายในหน้าจอใหญ่
                }}
            >
                <Box 
                    component="img" 
                    src="https://cdn.discordapp.com/attachments/1274054168755306628/1302296341061570664/SIGNUP.PNG?ex=6727997b&is=672647fb&hm=6bbae916f07f0754e0ab297bf3b1a6183a26978bbb165409f964d50980564934&" 
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
                    marginRight: { md: '15%' }, // เพิ่ม marginRight เพื่อขยับกล่อง Input เข้ากลางในหน้าจอใหญ่
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
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
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
                >
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
};

export default SignUp;
