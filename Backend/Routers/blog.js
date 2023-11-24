const express = require("express")
const router = express.Router();
const blogController = require('../Controllers/blogController');


router.post("/addBlog" ,blogController.addBlog)
router.get("/getAllBlogs",blogController.getAllBlogs)
router.get("/:slug", blogController.getBlog)
router.delete("/:slug/delete",blogController.deleteBlog)
// router.post("/:slug/like",)
// router.get("/editStory/:slug",)
// router.put("/:slug/edit",)


module.exports = router