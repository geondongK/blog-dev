const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');

// 사용자 수정.
router.put('/:id', verifyToken, userController.update);
// 사용자 삭제.
router.put('/:id', verifyToken, userController.delete);
// 현재 사용자.
router.delete('/currentuser/:id', verifyToken, userController.currentUser);
// 댓글 좋아요.
router.put('/like/:postId', verifyToken, userController.like);
// 댓글 싫어요.
router.put('/dislike/:postId', verifyToken, userController.dislike);

module.exports = router;
