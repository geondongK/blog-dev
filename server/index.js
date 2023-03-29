const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
const path = require('path');

/* Routers */
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const authRoutes = require('./routes/auth');
const likedRoutes = require('./routes/liked');

const app = express();

/* token 암호화 생성법 */
/* node */
/* require('crypto').randomBytes(64).toString('hex') */

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: path.join(__dirname, './.env.production') });
} else if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: path.join(__dirname, './.env.development') });
} else {
    dotenv.config(); // for .env
}

/* Middleware */
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});

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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const s3 = new AWS.S3({
    accessKeyId: process.env.ACESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACESS_KEY_ID,
    region: process.env.REGION,
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        key: function (req, file, cb) {
            var ext = file.mimetype.split('/')[1];
            if (!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(ext)) {
                return cb(new Error('Only images are allowed'));
            }
            cb(null, Date.now() + '.' + file.originalname.split('.').pop());
        },
    }),
    acl: 'public-read-write',
    limits: { fileSize: 5 * 1024 * 1024 },
    // limits: { fileSize: 5 * 1024 },
});

// 이미지 업로드 테스트.
// const upload = multer({
//     storage: multer.diskStorage({
//         // 저장할 장소
//         destination(req, file, cb) {
// 서버에 폴더 생성.
//             cb(null, 'public/uploads');
//         },
//         // 저장할 이미지의 파일명
//         filename(req, file, cb) {
//             let ext = file.mimetype.split('/')[1];
//             // const ext = path.extname(file.originalname); // 파일의 확장자
//             // console.log(ext);
//             // if (!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(ext)) {
//             if (!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(ext)) {
//                 return cb(new Error('Only images are allowed'));
//             }
//             // 파일명이 절대 겹치지 않도록 해줘야한다.
//             // 파일이름 + 현재시간밀리초 + 파일확장자명
//             cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//         },
//     }),
//     // 파일 허용 사이즈 (5 MB)
//     limits: { fileSize: 5 * 1024 * 1024 },
//     // limits: { fileSize: 5 * 1024 },
// });

let uploads = upload.single('file');

app.post('/api/upload', function (req, res) {
    uploads(req, res, function (error) {
        if (error) {
            return res.json({ error: error.message });
        }
        res.status(200).json({ location: req.file.location });
        // 이미지 업로드 테스트.
        // const IMG_URL = `http://localhost:5000/uploads/${req.file.filename}`;
        // res.json({ url: IMG_URL });
    });
});

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/liked', likedRoutes);

const port = 5000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
