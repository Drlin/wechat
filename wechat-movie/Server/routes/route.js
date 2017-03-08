const Movie = require('../controllers/movie');

module.exports = function(router) {
	
	router.get('/movie', Movie.list)

	router.get('/movie/:nid', Movie.detail)
}