const mongoose = require('mongoose');
const Comment = require('../models/comment');
const Miniapp = require('../models/miniapp');
const {html_encode} =  require('../api/XSS');
module.exports = {
	create: function *(next) {
		let {content, star, miniappId} = this.request.body;
		const from = this.state.user._id;
		content = html_encode(content);
		const comment = new Comment({
			content, star, miniapp: miniappId, from
		})
		try {
			let _Miniapp = yield Miniapp.findOne({_id: miniappId}).exec()
			let {rating, overall_rating} = _Miniapp;
			let total = 0;
			let count = 0;
			let ratingItem = rating[star] || 0;
			rating[star] = ratingItem + 1;
			[1, 2, 3, 4, 5].map((item) => {
				let _rating = (rating[item] ? rating[item] : 0)
				count += item * _rating
				total += _rating
			})
			_Miniapp.overall_rating = total === 0 ? 0 : count/total.toFixed(2);
			try {
				yield _Miniapp.save();
			} catch (e) {
				return this.body = {
					status: 1,
					msg: e
				}
			}
		} catch(e) {
			return new Error(e)
		}
		try {
			yield comment.save();
		} catch(e) {
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
	lists: function *(next) {
		const {miniappId} = this.query;
		let comments = [];
		try {
			comments = yield Comment
				.find({miniapp: miniappId})
				.populate({
					path: 'from'
				})
				.exec();
		} catch(e) {
			return this.body = {
				status: 1,
				msg: e
			}
		}
		return this.body = {
			status: 0,
			data: comments
		}
	}
}