const mongoose = require('mongoose');
const uuid = require('uuid')
const User = require('../models/user');
const Sms = require('../api/sms.js')
const Redis = require('../api/redis.js')

module.exports = {
	getVerify: function *(next) {
		const phoneNum = this.request.body.phoneNum;
		let verifyCode = Sms.getCode();
		try {
			Sms.send(verifyCode, phoneNum)
			yield Redis.setRedis(phoneNum, {verifyCode}, 600)
			this.body = {
				status: 0,
				msg: '发送成功'
			}
		} catch(e) {
			this.body = {
				status: 1,
				msg: e
			}
		}
	},
	validate: function *(next) {
		let {verifyCode, phoneNum} = this.request.body;
		const reply = yield Redis.getRedis(phoneNum)
		if (verifyCode === reply.verifyCode) {
			let user = yield User.findOne({ phoneNum }).exec()
			user.verifyed = true;
			yield user.save();
			this.body = {
				status: 0,
				msg: '注册成功'
			}
		}
	},
	signIn: function *(next) {
		let {phoneNum, userName, password} = this.request.body;
		let user = yield User.findOne({ phoneNum }).exec();
		if (user) {
			return this.body = {
				status: 1,
				msg: '用户已存在'
			}
		};
		user = new User(this.request.body);
		try {
			yield user.save();
			this.body = {
				status: 0,
				msg: '保存成功'
			}
		} catch(e) {
			this.body = {
				status: 2,
				msg: e
			}
		}
		
	},
	signup: function *(next) {
		let {phoneNum, password} = this.request.body;
		user.comparePassword(password, function(err, isMatch) {
			if (err) {
				return next(err)
			}
			if (isMatch) {
				req.session.user = user
				return this.body = {
					status: 0,
					msg: '登录成功'
				});
			} else {
				return this.body = {
					status: 1,
					msg: '密码错误'
				};
			}
		})
	},
	logout: function(req, res, next) {
		delete req.session.user;
		return res.json({
			status: 0,
			msg: '退出成功'
		});
	},
	lists: function(req, res, next) {
		User.find({})
		.exec(function(err, docs) {
			if (err) {
				return next(err)
			}
			return res.json({
				status: 0,
				data: docs
			})
		})
	},
	signinRequired: function(req, res, next) {
		const user = req.session.user;
		if (!user) {
			return res.json({
				status: 1,
				msg: '尚未登录'
			})
		}
		next();
	},
	adminRequired: function(req, res, next) {
		const user = req.session.user;
		if (user.role < 10 || !user.role) {
			return res.json({
				status: 1,
				msg: '无权限'
			})
		}
		next();
	}
}