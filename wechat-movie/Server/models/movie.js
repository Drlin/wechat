const mongoose = require('mongoose')
const MovieSchema = require('../schemas/movie')
const Movie = mongoose.model('Moive', MovieSchema)
mongoose.Promise = require('bluebird')
module.exports = Movie