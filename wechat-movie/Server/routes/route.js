const Movie = require('../controllers/movie');
const User = require('../controllers/user.js');
const Game = require('../controllers/game.js');
const Rank = require('../api/pageRank.js');
const Catagory = require('../controllers/catagory.js');
const Miniapp = require('../controllers/miniapp.js');

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

	router.post('/api/catagory/save', Catagory.save)

	router.get('/api/catagory/catagoryList', Catagory.catagoryList)

	router.get('/api/catagory/catagorys', Catagory.catagorys)

	router.post('/api/miniapp/create', Miniapp.create)


}