const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/post', postController.createPost);
router.get('/post', postController.getAllPosts);
router.get('/post/:id',postController.getPostById);

module.exports = router;
