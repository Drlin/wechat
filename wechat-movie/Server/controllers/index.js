const Movie = require('../api/movie.js');

function* index(next) {
	const categories = yield Movie.findAll();
	this.render('index', {
		title: 'imooc 首页',
		categories
	})
}