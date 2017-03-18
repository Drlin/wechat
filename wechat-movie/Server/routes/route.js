const Movie = require('../controllers/movie');
const User = require('../controllers/user.js');

module.exports = function(router) {
	
	router.get('/api/movie', Movie.list)

	router.get('/api/movie/:nid', Movie.detail)

	router.post('/api/user/getVerify', User.getVerify)
	
	router.post('/api/user/signIn', User.signIn)
}