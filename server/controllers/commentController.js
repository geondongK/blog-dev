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
            'INSERT INTO comment ( postId, userId, parentId, commentGroup, description, userName, createDate) VALUES (?,?,?,?,?,?,?)';
        const row = await pool.query(query, [
            postId,
            userId,
            parentId,
            parentId,
            description,
            userName,
            createDate,
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
};

// 대댓글 존재 시 삭제 메시지 업데이트
exports.existComment = async (req, res) => {
    try {
        const { commentId } = req.body;

        const query = `UPDATE comment SET isDeleted = true WHERE id = ?`;
        const row = await pool.query(query, [commentId]);
        res.json(row);
    } catch (error) {
        res.json({ error: error.message });
    }
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
