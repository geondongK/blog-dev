const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { verifyToken } = require('../middleware/verifyToken');

// 게시물 댓글 작성.
router.post('/', verifyToken, commentController.addComment);

// 댓글 수정.
router.put('/editReply', commentController.editReply);
// router.put('/:id', commentController.editReply);

// 게시물 댓글 리스트.
router.get('/:postId', commentController.commentList);

// 댓글 삭제.
router.post('/commentDelete', commentController.deleteComment);
// router.post('/:id', commentController.commentDelete);

// 댓글 좋아요.
router.put('/like/:postId', commentController.deleteComment);

// 댓글 싫어요.
router.put('/dislike/:postId', commentController.deleteComment);

module.exports = router;
