const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verifyToken } = require('../middleware/verifyToken');

// 게시물 작성
router.post('/', verifyToken, postController.newpost);

// 게시물 리스트
router.get('/postList', postController.postList);

// 현재 게시물.
router.get('/get/:id', postController.getById);

// 게시물 삭제
// router.delete('/postDelete', verifyToken, postController.deletePost);

// 조회수.
router.put('/view/:id', postController.addView);

// 태그.
router.get('/tags', postController.getByTag);

// 검색.
router.get('/search', postController.search);

module.exports = router;
