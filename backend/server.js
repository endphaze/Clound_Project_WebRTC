const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const port = 3001;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // ระบุ origin ของ frontend
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// ตั้งค่าและเชื่อมต่อ MySQL Database
const connection = mysql.createConnection({
    host: 'localhost', // ใช้ localhost ถ้า MySQL รันอยู่ในเครื่องเดียวกัน
    user: 'root', // ชื่อผู้ใช้ MySQL
    password: 'Cowan2559', // รหัสผ่าน MySQL
    database: 'webrtc', // ชื่อ Database ของคุณ
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// ตั้งค่า socket.io
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // ฟังการส่งข้อความและบันทึกลงฐานข้อมูล
    socket.on('sendMessage', (data) => {
        const { groupId, sender, content, timestamp } = data;

        // บันทึกข้อความลงฐานข้อมูล
        const sql = 'INSERT INTO messages (Group_id, Sender, Content, Timestamp) VALUES (?, ?, ?, ?)';
        connection.query(sql, [groupId, sender, content, timestamp], (err) => {
            if (err) {
                console.error('Error saving message:', err);
                return;
            }

            // broadcast ให้เฉพาะกลุ่มเดียวกันเห็นข้อความ
            io.to(`group_${groupId}`).emit('receiveMessage', data);
        });
    });

    // ฟังการเข้าร่วมห้องและเข้าร่วม "ห้อง" ใน socket.io
    socket.on('joinGroup', (groupId) => {
        socket.join(`group_${groupId}`);
        console.log(`User ${socket.id} joined group ${groupId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// ตัวอย่าง API
app.get('/', (req, res) => {
    res.send('Hello from the Backend!');
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// API สำหรับสร้างบัญชีผู้ใช้
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO credentail (Username, Password) VALUES (?, ?)';
    connection.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ message: 'Error creating user' });
        }
        res.status(201).json({ message: 'User created successfully' });
    });
});

// API สำหรับการเข้าสู่ระบบด้วยการสร้างโทเค็น JWT
const jwt = require('jsonwebtoken');
const SECRET_KEY = '1234';

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM credentail WHERE Username = ? AND Password = ?';
    connection.query(sql, [username, password], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error logging in' });
        
        if (results.length > 0) {
            // สร้างโทเค็น JWT ที่เข้ารหัสข้อมูลผู้ใช้ (เช่น username) และกำหนดอายุโทเค็น
            const token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token: token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// API สำหรับการรับข้อมูลผู้ใช้โดยตรวจสอบผ่าน JWT
app.get('/getUser', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    // ตรวจสอบและถอดรหัส token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        // ใช้ username ที่ได้จาก token เพื่อดึงข้อมูลผู้ใช้จากฐานข้อมูล
        const sql = 'SELECT Username FROM credentail WHERE Username = ?';
        connection.query(sql, [decoded.username], (error, results) => {
            if (error) return res.status(500).json({ message: 'Error retrieving user data' });
            if (results.length > 0) {
                res.status(200).json({ username: results[0].Username });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        });
    });
});

// API สำหรับสร้างกลุ่มใหม่
app.post('/create-group', (req, res) => {
    const { groupName } = req.body;

    if (!groupName) {
        return res.status(400).json({ message: 'Group name is required' });
    }

    const sql = 'INSERT INTO `group` (Group_name) VALUES (?)';
    connection.query(sql, [groupName], (err, result) => {
        if (err) {
            console.error('Error creating group:', err);
            return res.status(500).json({ message: 'Error creating group' });
        }

        res.status(201).json({ message: 'Group created successfully', groupId: result.insertId });
    });
});

// API สำหรับการดึงข้อมูลกลุ่มทั้งหมด
app.get('/groups', (req, res) => {
    const sql = 'SELECT * FROM `group`';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching groups:', err);
            return res.status(500).json({ message: 'Error fetching groups' });
        }
        res.status(200).json(results);
    });
});

// API สำหรับเข้าร่วมกลุ่มโดยดึงประวัติการแชทของกลุ่มนั้นๆ
app.post('/join-group', (req, res) => {
    const { groupName } = req.body;

    if (!groupName) {
        return res.status(400).json({ message: 'Group name is required' });
    }

    const groupQuery = 'SELECT Group_id FROM `group` WHERE Group_name = ?';
    connection.query(groupQuery, [groupName], (err, results) => {
        if (err) {
            console.error('Error joining group:', err);
            return res.status(500).json({ message: 'Error joining group' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const groupId = results[0].Group_id;

        const messageQuery = 'SELECT * FROM messages WHERE Group_id = ? ORDER BY Timestamp ASC';
        connection.query(messageQuery, [groupId], (err, messages) => {
            if (err) {
                console.error('Error fetching messages:', err);
                return res.status(500).json({ message: 'Error fetching messages' });
            }

            res.status(200).json({ groupId, messages });
        });
    });
});

// API สำหรับส่งข้อความและบันทึกลงฐานข้อมูล
app.post('/send-message', (req, res) => {
    const { groupId, sender, content, timestamp } = req.body;

    if (!groupId || !sender || !content || !timestamp) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = 'INSERT INTO messages (Group_id, Sender, Content, Timestamp) VALUES (?, ?, ?, ?)';
    connection.query(sql, [groupId, sender, content, timestamp], (err, result) => {
        if (err) {
            console.error('Error saving message:', err);
            return res.status(500).json({ message: 'Error saving message' });
        }
        res.status(201).json({ message: 'Message sent successfully' });
    });
});

// API สำหรับดึงประวัติข้อความของห้องแชท
app.get('/messages', (req, res) => {
    const groupId = req.query.groupId;

    if (!groupId) {
        return res.status(400).json({ message: 'Group ID is required' });
    }

    const sql = 'SELECT * FROM messages WHERE Group_id = ? ORDER BY Timestamp ASC';
    connection.query(sql, [groupId], (err, results) => {
        if (err) {
            console.error('Error fetching messages:', err);
            return res.status(500).json({ message: 'Error fetching messages' });
        }
        res.status(200).json(results);
    });
});
