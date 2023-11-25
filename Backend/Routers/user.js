const express = require("express")
const router = express.Router();
const userController = require('../Controllers/userController');

router.get('/profile',userController.getProfile)
router.post("/editProfile",userController.editProfile)
// router.put("/changePassword",)
// router.post("/:slug/addStoryToReadList",)
// router.get("/readList",)


module.exports = router