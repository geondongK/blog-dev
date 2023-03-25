const express = require('express');
const router = express.Router();
const likedController = require('../controllers/likedController');
const { verifyToken } = require('../middleware/verifyToken');

router.get('/:id', likedController.getLike);
// 좋아요 추가.
router.post('/', verifyToken, likedController.addLike);
// 좋아요 삭제.
router.delete('/', verifyToken, likedController.deleteLike);

module.exports = router;
