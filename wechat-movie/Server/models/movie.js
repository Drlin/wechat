const mongoose = require('mongoose')
const MoiveSchema = require('../schemas/blog')
const Moive = mongoose.model('Moive', MoiveSchema)

module.exports = Moive