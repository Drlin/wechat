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
	detail: function *(next) {
		const id = this.params.id;
		if (!id) {
			return this.body = {
				status: 1,
				data: '没找到ID'
			}
		}
		yield Miniapp.update({_id: id}, {$inc: {viewNum: 1}})
		let _Miniapp = yield Miniapp
						.findOne({_id: id})
						.exec();
		if (!_Miniapp) {
			return this.body = {
				status: 1,
				data: '没找到对应小程序'
			}
		}				
		this.body = {
			status: 0,
			data: _Miniapp
		}
	}
}