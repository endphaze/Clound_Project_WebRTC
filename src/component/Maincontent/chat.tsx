import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Avatar } from '@mui/material';

export const Chat = () => {
    // สถานะสำหรับจัดเก็บข้อความ
    const [message, setMessage] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<{ text: string; sender: 'me' | 'other'; name: string }[]>([]);

    // ฟังก์ชันส่งข้อความ
    const handleSendMessage = () => {
        if (message.trim()) {
            setChatHistory([...chatHistory, { text: message, sender: 'me', name: 'My Name' }]);
            setMessage(''); // ล้างช่องข้อความหลังจากส่ง
        }
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex' }}>
            {/* Sidebar */}
            <Box sx={{ width: '25%', backgroundColor: '#333', color: '#fff', padding: 2 }}>
                <Typography variant="h6">Group Chat</Typography>
                <Button variant="contained" sx={{ width: '100%', mt: 2 }}>
                    Create Group
                </Button>
                <Button variant="outlined" sx={{ width: '100%', mt: 1, color: '#fff', borderColor: '#fff' }}>
                    Join Group
                </Button>
                
                {/* เว้นว่างสำหรับ Session ในอนาคต */}
                <Box sx={{ mt: 2 }}></Box>
            </Box>

            {/* Chat Display */}
            <Box sx={{ width: '75%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box sx={{ padding: 2, borderBottom: '1px solid #ddd' }}>
                    <Typography variant="h6">TEAM A GROUP</Typography>
                </Box>

                {/* Chat History */}
                <Box sx={{ flex: 1, overflowY: 'auto', padding: 2, backgroundColor: '#f9f9f9' }}>
                    {chatHistory.map((chat, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: chat.sender === 'me' ? 'row-reverse' : 'row',
                                alignItems: 'center',
                                marginBottom: 2,
                            }}
                        >
                            <Avatar sx={{ bgcolor: chat.sender === 'me' ? '#1976d2' : '#888', margin: chat.sender === 'me' ? '0 0 0 8px' : '0 8px 0 0' }}>
                                {chat.name[0]}
                            </Avatar>
                            <Box
                                sx={{
                                    maxWidth: '60%',
                                    padding: 1,
                                    backgroundColor: chat.sender === 'me' ? '#1976d2' : '#e0e0e0',
                                    color: chat.sender === 'me' ? '#fff' : '#000',
                                    borderRadius: 2,
                                    textAlign: chat.sender === 'me' ? 'right' : 'left',
                                }}
                            >
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    {chat.name}
                                </Typography>
                                <Typography variant="body1">{chat.text}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Message Input */}
                <Box sx={{ display: 'flex', padding: 2, borderTop: '1px solid #ddd' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Message Text..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleSendMessage();
                        }}
                    />
                    <Button variant="contained" sx={{ marginLeft: 1 }} onClick={handleSendMessage}>
                        Send
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

