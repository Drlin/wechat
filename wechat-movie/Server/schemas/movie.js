econst mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MovieSchema = new Schema({
    director: String,
    title: String,
    content: String,
    catagory: {type: ObjectId, ref: 'Catagory'},
    description: String,
    picurl: String,
    url: String,
    doubanId: String,
    rating: String,
    summary: String,
    year: String,
    genres: [String],
    collect_count: String,
    alt: String,
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

MovieSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}
    next()
})

module.exports = MovieSchema;