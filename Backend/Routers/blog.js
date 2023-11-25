const express = require("express")
const router = express.Router();
const blogController = require('../Controllers/blogController');


router.post("/addBlog" ,blogController.addBlog)
router.get("/:slug", blogController.getBlog)
router.get("/editBlog/:slug",blogController.editBlogPage)
router.put("/:slug/edit",blogController.updateBlog)
router.get("/getAllBlogs",blogController.getAllBlogs)
router.delete("/:slug/delete",blogController.deleteBlog)
// router.post("/:slug/like",)
// router.put("/:slug/edit",)


module.exports = router