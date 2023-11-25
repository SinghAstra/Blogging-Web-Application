const express = require("express")
const router = express.Router()
const blogRoute = require('./blog')
const authRoute = require('./auth')
const userRoute = require('./user');

router.use("/auth",authRoute)
router.use("/blog",blogRoute)
router.use("/user",userRoute)

module.exports = router