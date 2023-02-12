const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { verifyToken } = require('../middleware/verifyToken');

// 게시물 댓글 리스트.
router.get('/:postId', commentController.commentList);

// 게시물 댓글 작성.
router.post('/', verifyToken, commentController.addComment);

// 댓글 수정.
router.put('/', commentController.editComment);
// router.put('/:id', commentController.editReply);

// 댓글 삭제.
router.delete('/', commentController.deleteComment);
// router.post('/:id', commentController.commentDelete);

// 좋아요.
router.put('/like', commentController.addLike);

// 싫어요.
router.put('/dislike', commentController.deleteLike);

module.exports = router;
