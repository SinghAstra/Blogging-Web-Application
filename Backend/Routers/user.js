const express = require("express")
const router = express.Router();
const userController = require('../Controllers/userController');

router.get('/profile',userController.getProfile)


module.exports = router