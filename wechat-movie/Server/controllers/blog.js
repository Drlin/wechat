const mongoose = require('mongoose');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const Catagory = require('../models/catagory');

module.exports = {
	create: function(req, res, next) {
		const _Blog = new Blog(req.body);
		_Blog.save(function(err, docs) {
			if (err) return next(err);
			if (req.body.catagory) {
				Catagory.findOne({_id: docs.catagory}, function(err, catagory) {
					catagory.blogs.push(docs._id)
					catagory.save(function(err, docs) {
						if (err) return next(err);
						return res.json({
							status: 0,
							msg: '保存成功'
						});
					})	
				})
			} else {
				var catagory = new Catagory({
					name: req.body.catagoryName,
					blogs: [docs._id]
				})
				catagory.save(function(err, catagory) {
					if (err) return next(err);
					return res.json({
						status: 0,
						msg: '保存成功'
					});
				})
			}
			
		});
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