const mongoose = require('mongoose')
const VerifySchema = require('../schemas/verify')

const Verify = mongoose.model('Verify', VerifySchema);
module.exports = Verify;