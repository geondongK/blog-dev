const pool = require('../database/connectMaria');
const jwt = require('jsonwebtoken');
const moment = require('moment');
// const fsExtra = require('fs-extra');

// 게시물 리스트
exports.postList = async (req, res) => {
    try {
        const { limit, offset } = req.query;

        const query = `SELECT * FROM post ORDER BY id DESC LIMIT ? OFFSET ? `;
        const row = await pool.query(query, [Number(limit), Number(offset)]);
        res.status(200).json(row);

        // res.json({ success: ture, row: row });
    } catch (error) {
        res.json({ error: error.message });
    }
};

// 현재 게시물.
exports.getById = async (req, res) => {
    try {
        // url 파라미터 값 가져오기
        const id = req.params.id;

        const query = 'SELECT * FROM post WHERE id = ?';
        const row = await pool.query(query, [id]);

        res.status(200).json(row);

        // res.json([row[0].title, row[0].body]);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// 게시물 작성
exports.addpost = async (req, res) => {
    try {
        const { userId, title, description, name } = req.body;
        // const { title } = req.body;

        const today = moment().format('YYYY.MM.DD HH:mm');

        const query =
            'INSERT INTO post (userId, title, description, name, createDate) VALUES (?,?,?,?,?)';
        const row = await pool.query(query, [
            userId,
            title,
            description,
            name,
            today,
        ]);

        res.status(200).json({
            row: row,
        });
    } catch (error) {
        res.json({ error: error.message });
    }
};

// 게시물 수정
exports.editpost = async (req, res) => {
    try {
        const id = req.params.id;

        const { title, description } = req.body;

        const query =
            'UPDATE post SET title = ? , description = ? WHERE id = ?';
        const row = await pool.query(query, [title, description, id]);

        return res.status(200).json({
            row: row,
        });
    } catch (error) {
        res.json({ error: error.message });
    }
};

// 게시물삭제.
exports.deletePost = async (req, res) => {
    const { postId } = req.body;
    // console.log(postId);
    try {
        const query = 'DELETE FROM post WHERE id = ?';
        const row = await pool.query(query, [postId]);
        res.status(200).json('게시물 삭제완료.');
    } catch (error) {
        res.json({ error: error.message });
    }
};

// 조회수.
exports.addView = async (req, res) => {
    const { id } = req.body;
    // console.log(id);

    try {
        const query = 'UPDATE post SET view = view + 1 WHERE id = ?';
        const row = await pool.query(query, [id]);
        res.status(200).json('Add view');
    } catch (error) {
        res.json({ error: error.message });
    }
};

// 검색.
exports.search = async (req, res) => {
    const search = req.query.q;

    try {
        const query = 'SELECT * FROM post WHERE title LIKE ?';
        const row = await pool.query(query, ['%' + search + '%']);
        res.status(200).json(row);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// 태그.
// exports.getByTag = async (req, res) => {
//     const tags = req.query.tags.split(',');
//     console.log(tags);

//     try {
//         const query = 'SELECT * FROM tags = ?';
//         const row = await pool.query(query, [tags]);
//         res.json({ success: true }, row);
//     } catch (error) {
//         res.json({ error: error.message });
//     }
// };
