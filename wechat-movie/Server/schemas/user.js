const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	name: String,
	password: String,
	role: {
		type: Number,
		default: 0
	},
	phoneNum: {
		unique: true,
		type: Number
	},
	accessToken: String,
	verifyed: {
		type: Boolean,
		default: false
	},
	portrait: {
		type: String,
		default: 'https://ss1.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/4633e5b08fe696b0e6b4bbe7949fe7949f9348'
	},
	meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

UserSchema.methods = {
	comparePassword: function(_password) {
		bcrypt.compare(_password, this.password , (err, isMatch) => {
			if (!err) {
				return isMatch
			} else {
				return null
			}
		})
	}
}

UserSchema.pre('save', function (next) {
	if (!this.password) {
		next()
	}
	var that = this
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}
	bcrypt.genSalt(10, (err, salt)=> {
		if (err) {
			return next(err)
		}
		bcrypt.hash(that.password, salt, (err, hash)=> {
			if (err) {
				return next(err)
			}
			that.password = hash
			next()
		})
	})
})

module.exports = UserSchema;
