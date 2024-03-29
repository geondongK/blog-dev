const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verifyToken } = require('../middleware/verifyToken');

// 게시물 리스트
router.get('/postList', postController.postList);
// 현재 게시물.
router.get('/get/:id', postController.getById);
// 댓글 수
router.post('/countComment', postController.countComment);
// 게시물 작성
router.post('/', verifyToken, postController.addpost);
// 게시물 수정
router.put('/edit/:id', verifyToken, postController.editpost);
// 게시물 삭제
router.delete('/', verifyToken, postController.deletePost);
// 조회수.
router.put('/view', postController.addView);
// 검색.
router.post('/search', postController.search);
// 태그.
// router.get('/tags', postController.getByTag);

module.exports = router;
