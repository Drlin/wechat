const mongoose = require('mongoose');
const Comment = require('../models/comment');

module.exports = {
	save: function(req, res, next) {
		const body = req.body;
		const blog = body.blog;
		const from = req.session.user._id;
		const to = body.to;
		const content = body.content;
		const comment = new Comment({
			blog: blog,
			from: from,
			to: to,
			content: content
		})

		comment.save(function(err, comment) {
			if (err) {
				return next(err);	
			}
			return res.json({
				status: 0,
				msg: '评论成功'
			})
		})

	}
}