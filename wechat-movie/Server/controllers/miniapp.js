const mongoose = require('mongoose');
const _ = require('lodash')
const Miniapp = require('../models/miniapp');
const Comment = require('../models/comment');
const Catagory = require('../models/catagory');

module.exports = {
	create: function *(next) {
		const _Miniapp = new Miniapp(this.request.body);
		try {
			yield _Miniapp.save()
		} catch (e) {
			return this.body = {
				status: 1,
				msg: e
			}
		}
		return this.body = {
			status: 0,
			msg: '保存成功'
		}
	},
	list: function(req, res, next) {
		const pagesize = parseInt(req.query.pagesize, 10) || 10;
		const pagestart = parseInt(req.query.pagestart, 10) || 1;
		Catagory.find({})
		.populate({path: 'blogs', options: {limit: pagesize, skip: (pagestart - 1) * pagesize}})
		.exec(function(err, docs) {
			if (err) {
				return next(err);
			}
			return res.json(docs);
		});
	},
	get: function(req, res, next) {
		const id = req.params.nid;
		if (!id) {
			return next(new Error('news not found'));
		}

		Blog
		.findOne({_id: id}, function(err, docs) {
			Comment.find({blog: id})
				.populate({path: 'from'}) 
				.exec(function(err, comments) {
				if(err) {
					return next(err);
				}
				if(!comments) {
					return next(new Error('new not Found'));
				}
				return res.json({
					status: 0,
					data: comments
				});
			})
		})
	}
}