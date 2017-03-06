const mongoose = require('mongoose')
const MovieSchema = require('../schemas/blog')
const Blog = mongoose.model('Blog', MovieSchema)

module.exports = Blog