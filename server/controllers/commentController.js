const pool = require('../database/connectMaria');

// 게시물 댓글 리스트.
exports.commentList = async (req, res) => {
    try {
        const postId = req.params.postId;

        const query = `
      SELECT *
      FROM comment 
      WHERE postId = ?
      ORDER BY IF(isnull(parentId), id, parentId), seq         
    `;
        const row = await pool.query(query, [postId]);
        res.json(row);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// 게시물 댓글 및 대댓글 작성.
exports.addComment = async (req, res) => {
    try {
        // const postId = req.params.postId;
        const comment = ({
            postId,
            userId,
            description,
            userName,
            parentId,
            createDate,
        } = req.body);

        const query =
            'INSERT INTO comment ( postId, userId, parentId, description, userName, createDate) VALUES (?,?,?,?,?,?)';
        const row = await pool.query(query, [
            postId,
            // req.user.id,
            userId,
            parentId,
            description,
            userName,
            createDate,
            // today,
        ]);

        // 프론트 map 오류현상 해결.
        const comments = {
            ...comment,
            id: row.insertId,
        };

        res.json(comments);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// 게시물 댓글 & 대댓글 업데이트
exports.editComment = async (req, res) => {
    try {
        const { newComment, commentId } = req.body;

        const query = `UPDATE comment SET description = ? WHERE id = ?`;
        const row = await pool.query(query, [newComment, commentId]);
        res.json(row);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// 댓글 삭제
exports.deleteComment = async (req, res) => {
    // let cnt = null;

    try {
        const { commentId } = req.body;

        const query = `DELETE FROM comment WHERE id = ?`;
        const row = await pool.query(query, [commentId]);
        res.json(row);
    } catch (error) {
        res.json({ error: error.message });
    }

    // if (parentId === null) {
    //     const selectQuery =
    //         'SELECT COUNT(*) AS cnt FROM description WHERE group = ? OR id = ?';
    //     let selectRow = await pool.query(selectQuery, [
    //         commentId,
    //         commentId,
    //     ]);
    //     cnt = selectRow[0].cnt;
    // } else {
    //     const selectQuery =
    //         'SELECT COUNT(*) AS cnt FROM comment WHERE group = ? OR id = ?';
    //     let selectRow = await pool.query(selectQuery, [
    //         parentId,
    //         commentId,
    //     ]);
    //     cnt = selectRow[0].cnt;
    // }

    // if (cnt >= 2) {
    //     const query = 'UPDATE comment SET isDeleted = true WHERE id = ?';
    //     const row = await pool.query(query, [commentId]);
    //     res.json(row);
    // } else {
    //     const query = 'DELETE FROM comment WHERE id = ?';
    //     const row = await pool.query(query, [commentId]);
    //     res.json(row);
    // }
};
// 좋아요
exports.getLike = async (req, res) => {
    try {
        const id = req.user.id;
        const postId = req.user.postId;

        const query = `
                SELECT *
                FROM comment 
                WHERE postId = ?
                ORDER BY IF(isnull(parentId), id, parentId), seq         
                `;
        const row = await pool.query(query, [postId]);
        res.json(row);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// 좋아요 추가
exports.addLike = async (req, res) => {
    try {
        const { commentId } = req.body;
        // const id = req.user.id;
        // const postId = req.user.postId;

        const query = 'UPDATE comment SET likes = likes + 1 WHERE id = ?';
        const row = await pool.query(query, [commentId]);
        res.json(row);
    } catch (error) {
        res.json({ error: error.message });
    }
};

exports.deleteLike = async (req, res) => {
    try {
        const { commentId } = req.body;
        // const id = req.user.id;
        // const postId = req.user.postId;

        const query = 'UPDATE comment SET likes = likes - 1 WHERE id = ?';
        const row = await pool.query(query, [commentId]);
        res.json(row);
    } catch (error) {
        res.json({ error: error.message });
    }
};
