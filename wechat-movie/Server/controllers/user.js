const mongoose = require('mongoose');
const uuid = require('uuid')
const User = require('../models/user');
const Sms = require('../api/sms.js')
const Redis = require('../api/redis.js')
const jwt = require('koa-jwt')

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
		} else {
			this.body = {
				status: 1,
				msg: '验证失败'
			}
		}
	},
	signIn: function *(next) {
		let {phoneNum, userName, password} = this.request.body;
		let user = yield User.findOne({ phoneNum }).exec();
		if (user) {
			if (user.verifyed) {
				return this.body = {
					status: 1,
					msg: '用户已存在'
				}
			} else {
				try {
					yield User.remove({phoneNum}).exec();
				} catch(e) {
					return this.body = {
						status: 1,
						msg: '操作失败'
					}
				}
			}
		}
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
		let user = yield User.findOne({ phoneNum }).exec();
		if (!user || !user.verifyed) {
			return this.body = {
				status: 1,
				msg: '无效的用户名或密码'
			};
		}
		const isMatch = user.comparePassword(password);
		if (isMatch) {
			const token = jwt.sign({_id: user._id}, 'lin', {exp: Date.now() + 1*30*1000})
			return this.body = {
				status: 0,
				token,
				msg: '登录成功'
			};
		} else {
			return this.body = {
				status: 1,
				msg: '无效的用户名或密码'
			};
		}
	},
	logout(req, res, next) {
		delete req.session.user;
		return res.json({
			status: 0,
			msg: '退出成功'
		});
	},
	userCenter: function *(next) {
		if (!this.state.user) {
			return this.body = {
				status: 1,
				msg: '用户未登录'
			};
		}
		let userId = this.state.user;
		let user = {};
		try {
			 user = yield User.findOne({_id: userId._id}).exec();
		} catch(e) {
			return this.body = {
				status: 1,
				msg: '用户未登录'
			};
		}
		
		let {name, phoneNum, _id, role, portrait} = user
		return this.body = {
			status: 0,
			data: {name, phoneNum, _id, role, portrait}
		};
	},
	userUpdate: function *(next) {
		let userId = this.state.user;
		const user = yield User.findOne({_id: userId._id}).exec();
		let _id = user._id;
		delete user._id;
		try {
			yield User.update({_id:_id}, this.request.body)
		} catch (e) {
			return this.body = {
				status: 1,
				msg: ' 更新失败'
			}
		}
		this.body = {
			status: 0,
			msg: ' 更新成功'
		}
	},
	lists(req, res, next) {
		try {
			let users = yield User.find({});
		} catch (e) {
			return this.body = {
				status: 1,
				msg: '查询失败'
			}
		}
		return this.body = {
			status: 0,
			data: users
		}
	},
	adminRequired(req, res, next) {
		let userId = this.state.user;
		const user = yield User.findOne({_id: userId._id}).exec();
		if (user.role < 10 || !user.role) {
			return this.body = {
				status: 1,
				msg: '无权限'
			};
		}
		yield next;
	}
}