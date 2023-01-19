const pool = require('../database/connectMaria');

// 이름 수정.
exports.update = async (req, res, next) => {
    // const { email, password } = req.body;

    if (req.params.id === req.user.id) {
        try {
            const query = 'UPDATE user SET name = ? WHERE id = ?';
            const row = await pool.query(query, [req.body.name, req.user.id]);

            res.json({ success: true, message: '이름이 변경되었습니다.' });
        } catch (error) {
            next(error);
        }
    } else {
        res.json({ success: false, message: '본인 계정만 변경 가능합니다.' });
    }
};
// 아이디 삭제.
exports.delete = async (req, res, next) => {
    // const { email, password } = req.body;
    if (req.params.id === req.user.id) {
        try {
            const query = 'DELETE FROM user WHERE id = ?';
            const row = await pool.query(query, [req.user.id]);

            res.json({ success: true, message: '삭제하였습니다.' });
        } catch (error) {
            next(error);
        }
    } else {
        res.json({ success: false, message: '본인 계정만 삭제 가능합니다.' });
    }
};
// 현재 사용자.
exports.currentUser = async (req, res, next) => {
    try {
        const query = 'DELETE FROM user WHERE id = ?';
        const row = await pool.query(query, [req.params.id]);

        res.json({ success: true, message: row[0] });
    } catch (error) {
        res.json({ success: false, message: '본인 계정만 삭제 가능합니다.' });
    }
};
// 좋아요.
exports.like = async (req, res, next) => {
    try {
    } catch (error) {
        res.json({ success: false, message: '본인 계정만 삭제 가능합니다.' });
    }
};
// 싫어요.
exports.dislike = async (req, res, next) => {
    try {
    } catch (error) {
        res.json({ success: false, message: '본인 계정만 삭제 가능합니다.' });
    }
};
