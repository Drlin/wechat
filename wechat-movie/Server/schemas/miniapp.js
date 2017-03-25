const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MiniappSchema = new Schema({
    name: String,
    overall_rating: Number,
    catagory: {type: ObjectId, ref: 'Catagory'},
    screenshot: [{ type: String}],
    description: String,
    icon: String,
    rating: [{ type: Number}],
    hot: Number,
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

MiniappSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}
    next()
})

module.exports = MiniappSchema;