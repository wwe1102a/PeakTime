const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Backend Server Running!');
});


app.post('/api/register', async (req, res) => {
  const { username, password, email, nickname } = req.body;

  
  if (!username || !password || !email || !nickname) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' });
  }

  try {
    
    const newUser = await pool.query(
      'INSERT INTO users (username, password, email, nickname) VALUES ($1, $2, $3, $4) RETURNING id, username, email, nickname',
      [username, password, email, nickname]
    );

    
    res.status(201).json({
      message: 'สมัครสมาชิกสำเร็จ!',
      user: newUser.rows[0]
    });

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
  }
});



app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  
  if (!username || !password) {
    return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
  }

  try {

    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'ไม่พบชื่อผู้ใช้งานนี้ในระบบ' });
    }

    const user = result.rows[0];

    
    if (password !== user.password) {
      return res.status(400).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
    }

    
    res.status(200).json({
      message: 'เข้าสู่ระบบสำเร็จ!',
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email,       
        nickname: user.nickname  
      }
    });

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});