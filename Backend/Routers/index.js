const express = require("express")
const router = express.Router()
const blogRoute = require('./blog')

router.use("/blog",blogRoute)

module.exports = router