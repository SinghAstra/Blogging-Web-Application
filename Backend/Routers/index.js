const express = require("express")
const router = express.Router()
const blogRoute = require('./blog')
const authRoute = require('./auth')
const userRoute = require('./user');
const commentRoute = require('./comment')

router.use("/auth",authRoute)
router.use("/blog",blogRoute)
router.use("/user",userRoute)
router.use("/comment",commentRoute)

module.exports = router