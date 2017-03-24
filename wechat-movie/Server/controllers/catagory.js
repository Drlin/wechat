const mongoose = require('mongoose');
const Blog = require('../models/blog');
const Catagory = require('../models/catagory');

module.exports = {
	save: function *(next) {
		const catagoryObj = this.request.body;
		const catagory = new Catagory({
			catagoryObj
		})
		try {
			yield catagory.save();
		} catch(e) {
			return this.body = {
				status: 1,
				msg: e
			}
		}
		this.body = {
			status: 0,
			msg: '保存成功'
		}
	},
	list: function(req, res, next) {
		const pagesize = parseInt(req.query.pagesize, 10) || 10;
		const pagestart = parseInt(req.query.pagestart, 10) || 1;
		Catagory.find({})
		.skip((pagestart - 1) * pagesize)
		.exec(function(err, docs) {
			if (err) {
				return next(err);
			}
			return res.json(docs);
		});
	},
}