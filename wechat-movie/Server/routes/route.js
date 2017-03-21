const Movie = require('../controllers/movie');
const User = require('../controllers/user.js');
const Game = require('../controllers/game.js');

module.exports = function(router) {
	
	router.get('/api/movie', Movie.list)

	router.get('/api/movie/:nid', Movie.detail)

	router.post('/api/user/getVerify', User.getVerify)
	
	router.post('/api/user/signIn', User.signIn)

	router.post('/api/user/validate', User.validate)

	router.post('/api/user/signUp', User.signup)

	router.get('/api/UserCenter', User.userCenter)

	router.post('/api/UserUpdate', User.userUpdate)

	router.get('/api/getConfig', Game.movie)
}