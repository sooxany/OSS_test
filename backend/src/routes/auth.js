// 인증 라우트
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
const User = require('../models/User'); // User 모델을 import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
