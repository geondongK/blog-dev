const pool = require('../database/connectMaria');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const {
    AccessToken,
    RefreshToken,
    RefreshVerify,
    AccessVerify,
    SnsRefreshVerify,
} = require('../utils/generateTokens');
require('dotenv').config();

// 로그인
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const query = 'SELECT * FROM user WHERE email = ?';
        const row = await pool.query(query, [email]);

        if (row[0]) {
            bcryptjs.compare(password, row[0].password, (err, result) => {
                if (result) {
                    const { password, ...userInfo } = row[0];

                    const accessToken = AccessToken(userInfo.id, userInfo.name);
                    const refreshToken = RefreshToken();

                    // refreshToken id, token 저장 쿼리.
                    const tokenQuery =
                        'UPDATE user SET token = ?  WHERE id = ?';
                    const tokenRow = pool.query(tokenQuery, [
                        refreshToken,
                        userInfo.id,
                    ]);

                    res.cookie('token', accessToken, {
                        sameSite: 'Lax',
                        httpOnly: true,
                        secure: true,
                        // expiresIn: '10m',
                        maxAge: 24 * 60 * 60 * 1000, // 하루
                        // origin: 'http://localhost:3000'
                        // origin: 'geondong.com',

                        // domain: '.geondong.com'
                    });
                    res.json({ message: 'success', user: userInfo });
                } else {
                    // res.json({ auth: false, message: '이메일 또는 비밀번호가 틀립니다.' });
                    res.json({
                        message: false,
                        error: '이메일 또는 비밀번호가 틀립니다.',
                    });
                }
            });
        } else {
            res.json({
                message: false,
                error: '이메일 또는 비밀번호가 틀립니다.',
            });
        }
    } catch (error) {
        res.json({ auth: false, error: error.message });
    }
};

// 회원가입.
exports.signUp = async (req, res) => {
    try {
        const { name, email, password, passwordConfirm } = req.body;
        // console.log(email);
        const query = 'SELECT * FROM user';
        const row = await pool.query(query);

        // 이메일 중복 체크
        const emailOverlap = row.some(e => e.email === email);
        // 별명 중복 체크
        const nameOverlap = row.some(e => e.name === name);

        if (emailOverlap) {
            return res.json({
                success: false,
                error: '이미 존재하는 이메일입니다.',
            });
        } else if (nameOverlap) {
            return res.json({
                success: false,
                error: '이미 존재하는 별명입니다.',
            });
        } else if (password !== passwordConfirm) {
            return res.json({
                success: false,
                error: '비밀번호가 일치하지 않습니다.',
            });
        } else {
            const hashPassword = await bcryptjs.hash(password, 12);
            const sqlInsertQuery =
                'INSERT INTO user (type, name, email, password) VALUES (?,?,?,?)';
            const row = await pool.query(sqlInsertQuery, [
                'dev',
                name,
                email,
                hashPassword,
            ]);

            res.json({ success: true, data: row });
        }
    } catch (error) {
        // res.send(err.message)
        res.json({ error: error.message });
    }
};

// 로그아웃
exports.logout = async (req, res) => {
    // res.cookie('token', '', { maxAge: 0, origin: 'geondong.com' });
    res.cookie('token', '', { maxAge: 0 });
    // res.cookie('refreshToken', '', { maxAge: 0 });
    res.json({ message: 'success' });
};

// refreshToken 재발급.
exports.refreshToken = async (req, res) => {
    if (req.cookies.token) {
        // if (req.headers.authorization) {

        const token = req.cookies.token;

        // console.log(token);

        // const token = req.headers.authorization.split('Bearer ')[1];

        if (!token)
            return res
                .status(403)
                .json({ message: 'Refresh Token is required!' });
        try {
            let refreshToken = null;
            // accessToken 검증
            const accessToken = AccessVerify(token);
            // console.log(accessToken);
            if (accessToken === 'jwt expired') {
                const userInfo = jwt.decode(
                    token,
                    process.env.ACCESS_TOKEN_SECRET,
                );

                // SNS, 내부가입 따로 분리.
                if (userInfo.type === 'kakao') {
                    refreshToken = await SnsRefreshVerify(userInfo.id);
                } else {
                    refreshToken = await RefreshVerify(userInfo.id);
                }
                // SNS, 내부가입 따로 분리.
                if (refreshToken === 'jwt expired') {
                    // console.log(refreshToken);
                    res.status(403).json({
                        isLoggedIn: false,
                        refreshTokenTimeOut: true,
                    });
                } else if (userInfo.type === 'kakao') {
                    const newAccessToken = jwt.sign(
                        {
                            id: userInfo.id,
                            name: userInfo.name,
                            type: 'kakao',
                            // 2h
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '30m', algorithm: 'HS256' },
                    );

                    res.cookie('token', newAccessToken, {
                        sameSite: 'Lax',
                        httpOnly: true,
                        secure: true,
                        // expiresIn: '10m',
                        maxAge: 24 * 60 * 60 * 1000, // 하루
                        // origin: 'http://localhost:3000'
                        // origin: 'geondong.com'
                        // domain: '.geondong.com'
                    });

                    res.status(200).json({
                        isLoggedIn: true,
                        accessToken: newAccessToken,
                    });
                } else {
                    const newAccessToken = jwt.sign(
                        {
                            id: userInfo.id,
                            name: userInfo.name,
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '30m', algorithm: 'HS256' },
                    );

                    res.cookie('token', newAccessToken, {
                        sameSite: 'Lax',
                        httpOnly: true,
                        secure: true,
                        // expiresIn: '10m',
                        maxAge: 24 * 60 * 60 * 1000, // 하루
                        // origin: 'http://localhost:3000'
                        // origin: 'geondong.com'
                        // domain: '.geondong.com'
                    });

                    res.status(200).json({
                        isLoggedIn: true,
                        accessToken: newAccessToken,
                    });
                }
            }
        } catch (error) {
            res.json({ error: error.message });
        }
    }
};
