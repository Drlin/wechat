const mongoose = require('mongoose')
const CatagorySchema = require('../schemas/catagory')
const Catagory = mongoose.model('Catagory', CatagorySchema)

module.exports = Catagory