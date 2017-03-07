const mongoose = require('mongoose')
const MovieSchema = require('../schemas/movie')
const Movie = mongoose.model('Moive', MovieSchema)

module.exports = Movie