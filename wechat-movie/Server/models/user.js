const mongoose = require('mongoose')
const BlogSchema = require('../schemas/user')

const User = mongoose.model('User', BlogSchema);
module.exports = User;