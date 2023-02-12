const pool = require('../database/connectMaria');

// 좋아요
exports.getLike = async (req, res) => {
    try {
        const id = req.params.id;
        // const id = req.query.id;

        const query = 'SELECT userId, commentId FROM likes WHERE postId = ? ';
        const row = await pool.query(query, [id]);

        return res.status(200).json(row.map(like => like));
        // return res.status(200).json({ commentId, userId });
    } catch (error) {
        res.json({ error: error.message });
    }
};

// 좋아요 추가
exports.addLike = async (req, res) => {
    try {
        const addLike = ({ postId, commentId, userId } = req.body);

        const query =
            'INSERT INTO likes (postId, commentId, userId) VALUES (?,?,?)';
        const row = await pool.query(query, [postId, commentId, userId]);

        return res.status(200).json(addLike);
    } catch (error) {
        res.json({ error: error.message });
    }
};

exports.deleteLike = async (req, res) => {
    try {
        const { userId, commentId } = req.body;

        const query = 'DELETE FROM likes WHERE userId = ? and commentId = ?';
        const row = await pool.query(query, [userId, commentId]);

        return res.status(200).json('좋아요 삭제');
    } catch (error) {
        res.json({ error: error.message });
    }
};
