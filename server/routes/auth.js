const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const kakaoController = require('../controllers/kakaoAuthController');

// 로그인
router.post('/login', authController.login);
// router.post('/login', login);

// 회원가입
router.post('/signup', authController.signUp);

// 로그아웃
router.post('/logout', authController.logout);

// 새로운 토큰 발급.
router.post('/refreshToken', authController.refreshToken);

// 카카오 로그인.
router.get('/kakao', kakaoController.kakaoAuthUrl);
router.get('/kakao/callback', kakaoController.kakaoLogin);

// 카카오 토큰 발급.
router.post('/kakaoToken', kakaoController.kakaoToken);

module.exports = router;
