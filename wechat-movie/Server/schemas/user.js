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
		return bcrypt.compareSync(_password, this.password);
	}
}

UserSchema.pre('save', function (next) {
	if (this.verifyed) {
		next();
	}
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(this.password, salt);
	this.password = hash;
	next();
})

module.exports = UserSchema;
