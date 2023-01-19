const pool = require('../database/connectMaria');
const moment = require('moment');

// 게시물 댓글 및 대댓글 작성.
exports.addComment = async (req, res) => {
    try {
        // const postId = req.params.postId;
        const comment = ({ post_id, id, parentId, comment_body, create_date } =
            req.body);
        const today = moment().format('YYYY.MM.DD HH:mm');

        if (parentId === undefined) {
            const query =
                'INSERT INTO comment ( post_id, user_id, comment_body, name, create_date) VALUES (?,?,?,?,?)';
            const row = await pool.query(query, [
                post_id,
                req.user.id,
                comment_body,
                req.user.name,
                today,
            ]);

            // current insert id 업데이트
            // const insertId = row.insertId;

            const updateQuery =
                'UPDATE comment SET comment_group = ? WHERE id = ?';
            const updateRow = await pool.query(updateQuery, [
                row.insertId,
                row.insertId,
            ]);
        } else {
            // 댓글 seq 순서.
            const seqQuery =
                'SELECT NVL((MAX(seq)+1),1) AS seq FROM comment WHERE parent_id = ?';
            const seqRow = await pool.query(seqQuery, [parentId]);

            const seq = seqRow[0].seq;

            const query =
                'INSERT INTO comment ( post_id, user_id, parent_id, comment_group, seq, comment_body, name, create_date) VALUES (?,?,?,?,?,?,?,?)';
            const row = await pool.query(query, [
                post_id,
                req.user.id,
                parentId,
                parentId,
                seq,
                comment_body,
                req.user.name,
                today,
            ]);
        }

        res.json(comment);
        // console.log(comment);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// 게시물 댓글 & 대댓글 업데이트
exports.editReply = async (req, res) => {
    const { newComment, commentId } = req.body;

    try {
        const query = `UPDATE comment SET comment_body = ? WHERE id = ?`;
        const row = await pool.query(query, [newComment, commentId]);
        res.json(row);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// 게시물 댓글 리스트.
exports.commentList = async (req, res) => {
    try {
        const postId = req.params.postId;

        const query = `
      SELECT *
      FROM comment 
      WHERE post_id = ?
      ORDER BY IF(isnull(parent_id), id, parent_id), seq         
    `;
        const row = await pool.query(query, [postId]);
        res.json(row);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// 댓글 삭제
exports.deleteComment = async (req, res) => {
    try {
        const { commentId, parentId } = req.body;

        let cnt = null;

        if (parentId === null) {
            const selectQuery =
                'SELECT COUNT(*) AS cnt FROM comment WHERE comment_group = ? OR id = ?';
            let selectRow = await pool.query(selectQuery, [
                commentId,
                commentId,
            ]);
            cnt = selectRow[0].cnt;
        } else {
            const selectQuery =
                'SELECT COUNT(*) AS cnt FROM comment WHERE comment_group = ? OR id = ?';
            let selectRow = await pool.query(selectQuery, [
                parentId,
                commentId,
            ]);
            cnt = selectRow[0].cnt;
        }

        if (cnt >= 2) {
            const query = 'UPDATE comment SET is_deleted = true WHERE id = ?';
            const row = await pool.query(query, [commentId]);
            res.json(row);
        } else {
            const query = 'DELETE FROM comment WHERE id = ?';
            const row = await pool.query(query, [commentId]);
            res.json(row);
        }
    } catch (error) {
        res.json({ error: error.message });
    }
};
// 좋아요
exports.like = async (req, res) => {
    try {
        const id = req.user.id;
        const postId = req.user.postId;

        const query = `
      SELECT *
      FROM comment 
      WHERE post_id = ?
      ORDER BY IF(isnull(parent_id), id, parent_id), seq         
    `;
        const row = await pool.query(query, [postId]);
        res.json(row);
    } catch (error) {
        res.json({ error: error.message });
    }
};
