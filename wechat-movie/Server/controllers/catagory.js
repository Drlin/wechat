const mongoose = require('mongoose');
const Blog = require('../models/blog');
const Catagory = require('../models/catagory');

module.exports = {
	save: function(req, res, next) {
		var name = req.body.name;
		var _catagory = new Catagory({
			name: name
		})
		_catagory.save(function(err, user) {
			if (err) return next(err);
			return res.json({
				status: 0,
				msg: ' 保存成功'
			});
		})
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