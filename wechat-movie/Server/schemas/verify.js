const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const VerifySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    from: {
        type: ObjectId,
        ref: 'User'
    },
    worker: String,
    description: {
        type: String,
        required: true
    },
    catagory: {type: ObjectId, ref: 'Catagory'},
    icon: {
        type: String,
        required: true
    },
    qrcode: {
        type: String,
        required: true
    },
    screenshot: [
        {type: String}
    ],
    verifyed: {
        type: Boolean,
        default: false
    },
    meta:{
        createAt: {
            type: Date,
            default:Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

VerifySchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}
    next()
})

module.exports = VerifySchema;