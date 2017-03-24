const mongoose = require('mongoose');
const Blog = require('../models/blog');
const Catagory = require('../models/catagory');

module.exports = {
	save: function *(next) {
		const catagoryObj = this.request.body;
		if (!catagoryObj.name) {
			return this.body = {
				status: 1,
				msg: '请输入分类名'
			}
		}
		const catagory = new Catagory(catagoryObj)
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
	catagoryList: function *(next) {
		let {limit, page, catagoryId} = this.query;
		limit = parseInt(limit, 10) || 10;
		page = parseInt(page, 10) || 1;
		if (!catagoryId) {
			return this.body = {
				status: 1,
				msg: '请提交种类'
			}
		}
		try { 
			const lists = yield Catagory.findOne({_id: catagoryId})
			.skip((page - 1) * limit)
			.exec();
			return this.body = {
				status: 0,
				data: lists
			}
		} catch (e) {
			return this.body = {
				status: 1,
				msg: e
			} 
		}
	},
}