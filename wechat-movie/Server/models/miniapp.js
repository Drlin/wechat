const mongoose = require('mongoose')
const MiniappSchema = require('../schemas/miniapp')
const Miniapp = mongoose.model('Miniapp', MiniappSchema)

module.exports = Miniapp