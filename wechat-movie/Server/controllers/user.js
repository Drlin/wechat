const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
	signup: function(req, res, next) {
		var name = req.body.name;
		var password = req.body.password;
		var user = new User({
			name: name,
			password: password
		});

		user.save(function(err, user) {
			if (err) {
				return next(err)
			}
			return res.json({
				status: 0,
				msg: 'OK'
			});
		})
	},
	signin: function(req, res, next) {
		var name = req.body.name;
		var password = req.body.password;
		User.findOne({
			name: name
		}, function(err, user) {
			if (err) {
				return next(err)
			}
			if (!user) {
				return res.json({
					status: 1,
					msg: '用户不存在'
				});
			}
			user.comparePassword(password, function(err, isMatch) {
				if (err) {
					return next(err)
				}
				if (isMatch) {
					req.session.user = user
					return res.json({
						status: 0,
						msg: '登录成功'
					});
				} else {
					return res.json({
						status: 1,
						msg: '密码错误'
					});
				}
			})
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