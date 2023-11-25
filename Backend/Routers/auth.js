const express = require("express")
const router = express.Router();
const authController = require('../Controllers/authController');

router.post("/register",authController.registerUser);
router.post("/login",authController.logInUser);
router.post("/forgotpassword",authController.forgotPassword);
// router.put("/resetpassword",resetpassword)
// router.get("/private",getAccessToRoute,getPrivateData)



module.exports = router