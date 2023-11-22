const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/post', postController.createPost);
router.get('/post/:id',postController.getPostById);
router.put('/post/:id',postController.updatePostById);
router.delete('/post/:id',postController.deletePostById);
router.get('/post',postController.getAllPost);

module.exports = router;
