const express = require("express")
const router = express.Router();
const blogController = require('../Controllers/blogController');


router.post("/addBlog" ,blogController.addBlog)
router.get("/getAllBlogs",blogController.getAllBlogs)
router.get("/:slug", blogController.getBlog)
router.get("/editBlog/:slug",blogController.editBlogPage)
router.put("/:slug/edit",blogController.updateBlog)
router.delete("/:slug/delete",blogController.deleteBlog)
router.post("/:slug/like",blogController.likeBlog)


module.exports = router