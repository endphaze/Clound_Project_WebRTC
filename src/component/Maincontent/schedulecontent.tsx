import React from 'react';
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl } from '@mui/material';

export const ScheduleMeeting = () => {
    return (
        <Box sx={{ width: '100%', padding: 4, display: 'flex', justifyContent: 'flex-start', gap: 4 }}>
            {/* ส่วนฟอร์มด้านซ้าย */}
            <Box sx={{ width: { xs: '100%', md: '50%' }, alignItems: 'flex-start' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center',color: 'black' }}>
                    Schedule Meeting 
                </Typography>
                
                {/* My Room*/}
                <Box sx={{ width: '100%', textAlign: 'left' }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: 'black' }}>
                        My Room :
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        defaultValue="Meeting Name"
                        sx={{ mb: 3 }}
                        slotProps={{ input: { style: { borderRadius: '12px' } } }}
                    />
                </Box>

                {/* Time */}
                <Box sx={{ width: '100%', textAlign: 'left' }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: 'black' }}>
                        Time :
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <TextField
                            variant="outlined"
                            defaultValue="12/07/2024"
                            sx={{ width: '50%' }}
                            slotProps={{ input: { style: { borderRadius: '12px' } } }}
                        />

                        <FormControl sx={{ width: '25%' }}>
                            <Select defaultValue="1" displayEmpty sx={{ borderRadius: '12px' }}>
                                {[...Array(12).keys()].map(hour => (
                                    <MenuItem key={hour} value={hour + 1}>
                                        {hour + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: '25%' }}>
                            <Select defaultValue="PM" displayEmpty sx={{ borderRadius: '12px' }}>
                                <MenuItem value="AM">AM</MenuItem>
                                <MenuItem value="PM">PM</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                {/* Description */}
                <Box sx={{ width: '100%', textAlign: 'left' }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: 'black' }}>
                        Description :
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                        sx={{ mb: 3 }}
                        slotProps={{ input: { style: { borderRadius: '12px' } } }}
                    />
                </Box>

                {/* Meeting ID */}
                <Box sx={{ width: '100%', textAlign: 'left' }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: 'black' }}>
                        Meeting ID :
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        defaultValue=""
                        sx={{ mb: 3 }}
                        slotProps={{ input: { style: { borderRadius: '12px' } } }}
                    />
                </Box>

                {/* ปุ่ม Save และ Cancel */}
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#fb9375',
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: '12px',
                            padding: '10px 20px',
                            '&:hover': {
                                backgroundColor: '#e57373',
                            },
                        }}
                    >
                        SAVE
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            color: '#fb9375',
                            fontWeight: 'bold',
                            borderRadius: '12px',
                            borderColor: '#fb9375',
                            padding: '10px 20px',
                            '&:hover': {
                                borderColor: '#e57373',
                                color: '#e57373',
                            },
                        }}
                    >
                        CANCEL
                    </Button>
                </Box>
            </Box>

            {/* ส่วนรูปภาพด้านขวา */}
            <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', justifyContent: 'center' }}>
                <Box
                    component="img"
                    src="https://cdn.discordapp.com/attachments/1266951871713775712/1302329304809738320/Schedule.PNG?ex=6727b82e&is=672666ae&hm=a4e6f8cdc59b0a95a2c23541e0133341c9a003aac0d75901b87fecf840599cf7&" // ใส่ URL ของรูปภาพที่นี่
                    alt="Schedule Illustration"
                    sx={{ maxWidth: '100%', height: 'auto' }}
                />
            </Box>
        </Box>
    );
};

export default ScheduleMeeting;
