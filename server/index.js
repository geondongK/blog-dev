const express = require('express');
// const fs = require('fs');
// const https = require('https');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
/* Routers */
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const authRoutes = require('./routes/auth');

const app = express();
// DB 암호화
require('dotenv').config();
/* token 암호화 생성법 */
/* node */
/* require('crypto').randomBytes(64).toString('hex') */
app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'http://localhost:5000',
            'http://34.237.21.161',
            'http://geondong.com',
            'https://localhost:3000',
            'https://localhost:5000',
            'https://34.237.21.161',
            'https://geondong.com',
        ],
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
        credentials: true,
    }),
);

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});

/* Middleware */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/auth', authRoutes);

// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });
const port = 5000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// https 서버 생성.
// const httpsServer = https.createServer({
//     key: fs.readFileSync(path.join(__dirname, '/cert', '/key.pem'), 'utf-8'),
//     cert: fs.readFileSync(path.join(__dirname, '/cert', '/cert.pem'), 'utf-8')
// }, app)

// httpsServer.listen(5000, () => {
//     console.log('Example app listening on port 5000');
// })
