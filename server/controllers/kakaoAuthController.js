const pool = require('../database/connectMaria');
const jwt = require('jsonwebtoken');
const { AccessToken, RefreshToken } = require('../utils/generateTokens');
// const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

const KAKAO_OAUTH_TOKEN_API_URL = 'https://kauth.kakao.com/oauth';
const KAKAO_GRANT_TYPE = 'authorization_code';
const KAKAO_REDIRECT_URL = 'http://localhost:5000/api/auth/kakao/callback';
// const KAKAO_REDIRECT_URL="https://geondong.com/api/auth/kakao/callback"

exports.kakaoToken = async (req, res, next) => {
    const { token } = req.cookies;

    // console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // console.log(decoded.id);
        res.json({ snsLoginSuccess: true, id: decoded.id, name: decoded.name });
    } catch (error) {
        // TokenExpiredError
        // 기간 만료

        // JsonWebTokenError
        // 서명이 유효하지 않거나 수정된 경우

        // NotBeforeError
        // jwt형식이 아닌경우

        if (error.name === 'TokenExpiredError') {
            res.json({ snsLoginSuccess: false, error: error });
        }
        if (error.name === 'JsonWebTokenError') {
            res.json({ snsLoginSuccess: false, error: error });
        }
        if (error.name === 'NotBeforeError') {
            res.json({ snsLoginSuccess: false, error: error });
        }
        // console.log(error)
    }
};

exports.kakaoAuthUrl = async (req, res, next) => {
    return res.redirect(
        `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`,
    );
};

exports.kakaoLogin = async (req, res, next) => {
    // let code = req.query.code;
    let code = req.query.code;
    // console.log(code);
    try {
        const { data } = await axios({
            method: 'POST',
            url: `${KAKAO_OAUTH_TOKEN_API_URL}/token`,
            headers: {
                'content-type':
                    'application/x-www-form-urlencoded;charset=utf-8',
            },
            params: {
                grant_type: KAKAO_GRANT_TYPE, //특정 스트링
                client_id: process.env.KAKAO_CLIENT_ID,
                redirectUri: KAKAO_REDIRECT_URL,
                code: code,
            },
        });

        const kakaoAccessToken = data.access_token;
        // console.log(data);

        const { data: me } = await axios({
            method: 'GET',
            url: `https://kapi.kakao.com/v2/user/me`,
            headers: {
                authorization: `bearer ${kakaoAccessToken}`,
            },
        });

        // console.log(me);

        const { id, kakao_account } = me;
        const userInformation = {
            // 이메일 선택 동의.
            // email: kakao_account.email,
            nickname: kakao_account.profile.nickname,
            sns_id: id,
            type: 'kakao',
        };

        // console.log(userInformation);

        const query = 'SELECT * FROM user ';
        const row = await pool.query(query);

        // 이메일 중복 체크
        const typeIdOverlap = row.some(
            e => e.type_id === userInformation.sns_id,
        );

        // console.log(typeIdOverlap);

        if (typeIdOverlap) {
            const accessToken = AccessToken(
                userInformation.sns_id,
                userInformation.nickname,
                userInformation.type,
            );
            const refreshToken = RefreshToken();

            // const refreshToken = snsRefreshToken(userInformation.sns_id, userInformation.nickname)

            const tokenQuery = 'UPDATE user SET token = ?  WHERE type_id = ?';
            const tokenRow = pool.query(tokenQuery, [
                refreshToken,
                userInformation.sns_id,
            ]);

            res.cookie('token', accessToken, {
                sameSite: 'Lax',
                httpOnly: true,
                secure: true,
                // expiresIn: '10m',
                maxAge: 24 * 60 * 60 * 1000, // 하루
                // origin: 'http://localhost:3000'
                // origin: 'geondong.com'
                // domain: '.geondong.com'
            });
        } else {
            const sqlInsertQuery =
                'INSERT INTO user (type, type_id, name) VALUES (?,?,?)';
            const row = await pool.query(sqlInsertQuery, [
                userInformation.type,
                userInformation.sns_id,
                userInformation.nickname,
            ]);

            const accessToken = AccessToken(
                userInformation.sns_id,
                userInformation.nickname,
                userInformation.type,
            );
            const refreshToken = RefreshToken();

            // const refreshToken = snsRefreshToken(userInformation.sns_id, userInformation.nickname)

            const tokenQuery = 'UPDATE user SET token = ?  WHERE type_id = ?';
            const tokenRow = pool.query(tokenQuery, [
                refreshToken,
                userInformation.sns_id,
            ]);

            res.cookie('token', accessToken, {
                sameSite: 'Lax',
                httpOnly: true,
                secure: true,
                // expiresIn: '10m',
                maxAge: 24 * 60 * 60 * 1000, // 하루
                // origin: 'http://localhost:3000',
                // origin: 'geondong.com',
                // domain: '.geondong.com'
            });
        }
    } catch (error) {
        // console.log(error);
    }

    return res.redirect('http://localhost:3000');
    // return res.redirect('https://geondong.com')
};
