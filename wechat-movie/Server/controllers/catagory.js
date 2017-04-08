const mongoose = require('mongoose');
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
		return this.body = {
			status: 0,
			msg: '保存成功'
		}
	},
	catagorys: function *(next) {
		let catagorys = [];
		try {
			catagorys = yield Catagory
			.find({})
			.exec();
		} catch(e) {
			return this.body = {
				status: 1,
				msg: e
			}
		}
		return this.body = {
			status: 0,
			data: catagorys.splice(2, 20)
		}
	},
	catagoryList: function *(next) {
		let {limit, page, catagoryId, catagoryName} = this.query;
		limit = parseInt(limit, 10) || 10;
		page = parseInt(page, 10) || 1;
		if (!catagoryId && !catagoryName) {
			return this.body = {
				status: 1,
				msg: '请提交种类'
			}
		}
		let obj = catagoryId ? {_id: catagoryId} : {name: catagoryName}
		try { 
			const lists = yield Catagory.findOne(obj)
			.populate(
				{
					path: 'miniapp', 
					options: {limit, skip: (page - 1) * limit}
				}
			)
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