const express = require("express")
const router = express.Router();
const commentController = require('../Controllers/commentController');

router.post('/:slug/addComment',commentController.addComment)

module.exports = router