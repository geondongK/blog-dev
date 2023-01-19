const jwt = require('jsonwebtoken');
const pool = require('../database/connectMaria');

// JWT 토큰 발급 및 인증
module.exports = {
    //  AccessToken 발급
    AccessToken: (id, name, type) => {
        // const payload = {};
        return jwt.sign({ id, name, type }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30m', // 토큰의 만료시간 10분 or 15분
            algorithm: 'HS256', // 암호화
            // issuer: 'localhost', // 발급자명
            // subject: 'user_info', // 명칭
            // MaxAge: 앞으로 몇 초 동안 쿠키가 유효한지 설정
            // Expires: 클라이언트를 기준으로 언제까지 유효한지 Date값으로 나타냄
        });
    },

    // AccessToken 검증
    AccessVerify: accessToken => {
        try {
            return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            return error.message;
        }
    },

    // RefreshToken 발급
    RefreshToken: () => {
        return jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, {
            algorithm: 'HS256', // 암호화
            expiresIn: '6h', // 토큰의 만료시간 //
            // expiresIn: '60s', // 토큰의 만료시간 //
        });
    },

    // RefreshToken 검증
    RefreshVerify: async id => {
        // refresh 토큰 DB 에서 가져오기.
        const sqlQuery = 'SELECT * FROM user WHERE id = ?';
        const row = await pool.query(sqlQuery, [id]);

        const userToken = row[0].token;

        try {
            return jwt.verify(userToken, process.env.REFRESH_TOKEN_SECRET);
        } catch (error) {
            return error.message;
        }
    },

    // SnsRefreshToken 검증
    SnsRefreshVerify: async id => {
        // refresh 토큰 DB 에서 가져오기.
        const sqlQuery = 'SELECT * FROM user WHERE type_id = ?';
        const row = await pool.query(sqlQuery, [id]);

        const userToken = row[0].token;

        try {
            return jwt.verify(userToken, process.env.REFRESH_TOKEN_SECRET);
        } catch (error) {
            return error.message;
        }
    },
};
