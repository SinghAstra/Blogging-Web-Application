const express = require("express")
const router = express.Router();
const userController = require('../Controllers/userController');

router.get('/profile',userController.getProfile)
router.post("/editProfile",userController.editProfile)
router.put("/changePassword",userController.changePassword)
router.post("/:slug/addStoryToReadList",userController.addStoryToReadList)
// router.get("/readList",)


module.exports = router