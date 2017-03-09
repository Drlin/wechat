const Movie = require('../controllers/movie');

module.exports = function(router) {
	
	router.get('/api/movie', Movie.list)

	router.get('/api/movie/:nid', Movie.detail)
}