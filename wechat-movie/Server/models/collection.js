const mongoose = require('mongoose')
const CollectionSchema = require('../schemas/collection')
const Collection = mongoose.model('Collection', CollectionSchema)

module.exports = Collection