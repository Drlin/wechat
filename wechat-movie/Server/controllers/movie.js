const mongoose = require('mongoose');
const Movie = require('../models/movie');

module.exports = {
	*list (next) {
		const movies = yield Movie.find({}).exec();
		this.body = movies;
		yield next;
	},

	*detail (next) {
		const movies = yield Movie.findOne({doubanId: this.params.nid}).exec();
		this.body = movies;
	}
}