const mongoose = require('mongoose');
const Movie = require('../models/movie');

module.exports = {
	list: function* (next) {
		const movies = yield Movie.find({}).exec();
		this.body = movies;
		yield next;
	},

	detail: function* (next) {
		const movies = yield Movie.findOne({doubanId: this.params.nid}).exec();
		this.body = movies;
	}
}