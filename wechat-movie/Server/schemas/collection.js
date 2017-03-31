const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CollectionSchema = new Schema({
    from: {
        type: ObjectId,
        ref: 'User'
    },
    miniapp: {type: ObjectId, ref: 'Miniapp'},
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

CollectionSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}
    next()
})

module.exports = CollectionSchema;