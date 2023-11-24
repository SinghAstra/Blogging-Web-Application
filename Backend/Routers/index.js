const express = require("express")
const router = express.Router()
const blogRoute = require('./blog')
const authRoute = require('./auth')

router.use("/auth",authRoute)
router.use("/blog",blogRoute)

module.exports = router