import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

export const Chat = () => {
    const [message, setMessage] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<{ text: string; sender: 'me' | 'other'; name: string; time: string }[]>([]);
    const [username, setUsername] = useState<string>('My Name');
    const [groups, setGroups] = useState<{ groupId: number; groupName: string }[]>([]);
    const [newGroupName, setNewGroupName] = useState<string>('');
    const [joinGroupName, setJoinGroupName] = useState<string>('');
    const [joinDialogOpen, setJoinDialogOpen] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [currentGroupName, setCurrentGroupName] = useState<string | null>(null);
    const [currentGroupId, setCurrentGroupId] = useState<number | null>(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }

        axios.get('http://localhost:3001/groups')
            .then(response => {
                setGroups(response.data);
            })
            .catch(error => {
                console.error('Error fetching groups:', error);
            });
    }, []);

    const handleSendMessage = () => {
        if (message.trim() && currentGroupId) {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' '); // แปลง timestamp เป็นรูปแบบที่ MySQL ยอมรับ

            // เพิ่มข้อความลงใน chatHistory ทันที
            setChatHistory([
                ...chatHistory,
                { text: message, sender: 'me', name: username, time: currentTime }
            ]);

            // ส่งข้อความไปยังเซิร์ฟเวอร์เพื่อบันทึกในฐานข้อมูล
            axios.post('http://localhost:3001/send-message', {
                groupId: currentGroupId,
                sender: username,
                content: message,
                timestamp: timestamp
            }).then(() => {
                setMessage(''); // เคลียร์ช่องข้อความหลังส่ง
            }).catch(error => {
                console.error('Error sending message:', error);
            });
        }
    };

    const handleCreateGroup = () => {
        if (newGroupName.trim()) {
            axios.post('http://localhost:3001/create-group', { groupName: newGroupName })
                .then(response => {
                    setGroups([...groups, { groupId: response.data.groupId, groupName: newGroupName }]);
                    setNewGroupName('');
                })
                .catch(error => {
                    console.error('Error creating group:', error);
                });
        }
    };

    const handleJoinGroup = () => {
        axios.post('http://localhost:3001/join-group', { groupName: joinGroupName })
            .then(response => {
                setChatHistory(response.data.messages.map((msg: { Content: string; Sender: string; Timestamp: string }) => ({
                    text: msg.Content,
                    sender: msg.Sender === username ? 'me' : 'other',
                    name: msg.Sender,
                    time: new Date(msg.Timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                })));
                setCurrentGroupName(joinGroupName);
                setCurrentGroupId(response.data.groupId);
                setJoinDialogOpen(false);
                setSnackbarOpen(true);
            })
            .catch(error => {
                console.error('Error joining group:', error);
            });
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex' }}>
            <Box sx={{ width: '25%', backgroundColor: '#333', color: '#fff', padding: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Group Chat</Typography>

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter group name..."
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    sx={{ backgroundColor: '#fff', marginBottom: 2, borderRadius: 1 }}
                />
                <Button variant="contained" fullWidth onClick={handleCreateGroup} sx={{ fontWeight: 'bold', mb: 2 }}>
                    Create Group
                </Button>

                <Button variant="outlined" fullWidth onClick={() => setJoinDialogOpen(true)} sx={{ color: '#fff', borderColor: '#fff', fontWeight: 'bold' }}>
                    Join Group
                </Button>

                <Box sx={{ mt: 2 }}>
                    {groups.map((group, index) => (
                        <Typography key={index} variant="body1" sx={{ fontWeight: 'bold', mb: 1, cursor: 'pointer' }}>
                            {group.groupName}
                        </Typography>
                    ))}
                </Box>
            </Box>

            <Box sx={{ width: '75%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ padding: 2, borderBottom: '1px solid #ddd' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{currentGroupName ? `Chat Room: ${currentGroupName}` : 'Select or Join a Group'}</Typography>
                </Box>

                <Box sx={{ flex: 1, overflowY: 'auto', padding: 2, backgroundColor: '#f9f9f9' }}>
                    {chatHistory.map((chat, index) => (
                        <Box key={index} sx={{ display: 'flex', flexDirection: chat.sender === 'me' ? 'row-reverse' : 'row', alignItems: 'center', marginBottom: 2 }}>
                            <Avatar sx={{ bgcolor: chat.sender === 'me' ? '#1976d2' : '#888', margin: chat.sender === 'me' ? '0 0 0 8px' : '0 8px 0 0' }}>
                                {chat.name[0]}
                            </Avatar>
                            <Box sx={{ maxWidth: '60%', padding: 1, backgroundColor: chat.sender === 'me' ? '#1976d2' : '#e0e0e0', color: chat.sender === 'me' ? '#fff' : '#000', borderRadius: 2, textAlign: chat.sender === 'me' ? 'right' : 'left' }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    {chat.name}
                                </Typography>
                                <Typography variant="body1">{chat.text}</Typography>
                                <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', textAlign: chat.sender === 'me' ? 'right' : 'left', color: '#999' }}>
                                    {chat.time}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

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
                        sx={{ fontWeight: 'bold' }}
                    />
                    <Button variant="contained" sx={{ marginLeft: 1, fontWeight: 'bold' }} onClick={handleSendMessage}>
                        Send
                    </Button>
                </Box>
            </Box>

            {/* Join Group Dialog */}
            <Dialog open={joinDialogOpen} onClose={() => setJoinDialogOpen(false)}>
                <DialogTitle>Join Group</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Group Name"
                        fullWidth
                        variant="outlined"
                        value={joinGroupName}
                        onChange={(e) => setJoinGroupName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setJoinDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleJoinGroup} color="primary">
                        Join
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for Join Success */}
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    Joined group {currentGroupName} successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Chat;
