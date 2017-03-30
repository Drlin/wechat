const mongoose = require('mongoose');
const _ = require('lodash')
const Collection = require('../models/collection');
const Miniapp = require('../models/miniapp');
const Comment = require('../models/comment');
const Catagory = require('../models/catagory');
const {errorType} = require('../middleware/middleware');
const {saveToRank, getRank} = require('../api/redis.js');

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
		return this.body = {
			status: 0,
			data: _Miniapp
		}
	},
	search: function *(next) {
		const query = this.request.body.query;
		if (!query) {
			return this.body = {
				status: 1,
				msg: '请输入查询条件'
			}
		}
		try {
			yield saveToRank('movie_rank', {name: query})
		} catch (e) {

		}
		
		let data = yield Miniapp
						.find({name: new RegExp(query)})
						.populate({
							path: 'catagory', 
							select: {name: 1}
						})
						.exec();
		return this.body = {
			status: 0,
			data
		}
	},
	hotLists: function *(next) {
		try {
			let lists = yield getRank('movie_rank')
			return this.body = {
				status: 0,
				data: lists.splice(0, 10)
			}
		} catch (e) {
			return this.body = {
				status: 1,
				msg: e
			}
		}
	}	
}