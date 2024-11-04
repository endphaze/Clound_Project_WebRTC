// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

// เปิดใช้งาน CORS เพื่อให้ Frontend สามารถเรียกใช้ API จากเซิร์ฟเวอร์ได้
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

// สร้าง API ตัวอย่าง
app.get('/', (req, res) => {
    res.send('Hello from the Backend!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// backend/server.js

//signup
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

//login // Token
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




