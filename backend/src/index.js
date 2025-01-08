// 서버 초기화
// require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // auth 라우터 가져오기

dotenv.config(); // .env 파일을 로드
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json()); // JSON 요청을 처리

// Database connection
connectDB();

// Routes
app.get('/', (req, res) => res.send('API is running...'));

// auth 라우터 사용
app.use('/api/auth', authRoutes);
// app.use('/api', authRoutes);  // '/api'로 시작하는 라우터 연결

// 서버 시작
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
