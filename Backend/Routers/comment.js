const express = require("express")
const router = express.Router();
const commentController = require('../Controllers/commentController');

router.post('/:slug/addComment',commentController.addComment)
router.get("/:slug/getAllComment",commentController.getAllCommentbyBlog)
router.post("/:comment_id/like",commentController.commentLike)
router.post("/:comment_id/getCommentLikeStatus",commentController.getCommentLikeStatus);

module.exports = router