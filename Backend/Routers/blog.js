const express = require("express")
const router = express.Router();
const blogController = require('../Controllers/blogController');


router.post("/addBlog" ,blogController.addBlog)
router.get("/getAllBlogs",blogController.getAllBlogs)
// router.post("/:slug", )
// router.post("/:slug/like",)
// router.get("/editStory/:slug",)
// router.put("/:slug/edit",)
// router.delete("/:slug/delete",)


module.exports = router