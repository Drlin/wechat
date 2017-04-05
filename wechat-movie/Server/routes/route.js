const Movie = require('../controllers/movie');
const User = require('../controllers/user.js');
const Game = require('../controllers/game.js');
const Rank = require('../api/pageRank.js');
const Catagory = require('../controllers/catagory.js');
const Miniapp = require('../controllers/miniapp.js');
const Comment = require('../controllers/comment.js');
const Collection = require('../controllers/collection.js');
const Wechat = require('../controllers/wechat.js');


const config = require('../../wechat/config/config')

const Promise = require('bluebird');
const request = require('request');
const fs = require('fs')

module.exports = function(router) {
	router.get('/api/user/test', function *(next) {
		let res = request({url: 'https://api.weixin.qq.com/cgi-bin/media/get?access_token=_Gbqp3eWM_C85Ziu_07BPZjD51ekylhwSOgPNQX36WeqsZzh7RfVHnW2gZ45X1CL-ICaNbR485bBUAcQMURY5MUoKMA13BSy0W7CdGsPXUsa-3J_31EyjsbtTp6G1Bj2EIHeAHAMQP&media_id=8bpD1EZ8cD6Dj5VItcYWUz0m9lIGnHCcNenRwh2cHsILuOEwRbx9JkbGYNd8w1qm'}).pipe(fs.createWriteStream('1111.png'))
		// console.log();
		this.body = {
			status: 1,
			data: res
		}

	})

	router.get('/api/movie', Movie.list)

	router.get('/api/movie/:nid', Movie.detail)

	router.post('/api/user/getVerify', User.getVerify)
	
	router.post('/api/user/signIn', User.signIn)

	router.post('/api/user/validate', User.validate)

	router.post('/api/user/signUp', User.signup)

	router.get('/api/user/getConfig', Game.movie)

	router.post('/api/user/getMedia', Wechat.getMedia)

	router.get('/api/UserCenter', User.userCenter)

	router.post('/api/UserUpdate', User.userUpdate)

	router.post('/api/catagory/save', Catagory.save)

	router.get('/api/catagory/catagoryList', Catagory.catagoryList)

	router.get('/api/catagory/catagorys', Catagory.catagorys)

	router.post('/api/miniapp/create', Miniapp.create)

	router.post('/api/miniapp/search', Miniapp.search)

	router.post('/api/comment/create', Comment.create)

	router.get('/api/miniapp/commentLists', Comment.lists)

	router.get('/api/miniapp/:id', Miniapp.detail)

	router.get('/api/miniapp/hotLists', Miniapp.hotLists)

	router.get('/api/miniapp/hotLists', Miniapp.hotLists)

	router.post('/api/collection/operate', Collection.operate)

	router.get('/api/collection/collectionList', Collection.collectionList)

	router.get('/api/collection/userCollection', Collection.userCollection)
	
	
	//错误处理
	// router.use(function *(err, next) {
 	// 	this.body = err
 	// })
}