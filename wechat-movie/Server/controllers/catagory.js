const mongoose = require('mongoose');
const Catagory = require('../models/catagory');
const Miniapp = require('../models/miniapp');


randomFind = () => {
	return new Promise((resolve) => {
		let promises = [];
		let skip;
		for (let i = 0; i < 100; i++) {
			let skip = Math.round(Math.random() * 450);
			promises.push(Miniapp
				.findOne({})
				.populate({
							path: 'catagory', 
							select: {name: 1}
						})
				.skip(skip)
				.exec()
			);
		};
		Promise.all(promises).then( (results) => {
			resolve(results);
		}).catch((e) => {
			console.log(e)
		})
	})
}
module.exports = {
	*save (next) {
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
	*catagorys (next) {
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

	*catagoryList (next) {
		let {limit, page, catagoryId, catagoryName} = this.query;
		let lists = [];
		limit = parseInt(limit, 10) || 10;
		page = parseInt(page, 10) || 1;
		if (!catagoryId && !catagoryName) {
			return this.body = {
				status: 1,
				msg: '请提交种类'
			}
		}
		let obj = catagoryId ? {_id: catagoryId} : {name: catagoryName}

		if (catagoryName === '推荐' || catagoryName === '排行榜') {
			try {
				lists = yield randomFind();
				return this.body = {
					status: 0,
					data: {
						miniapp: lists
					}
				}
			} catch(e) {
				return this.body = {
						status: 1,
						msg: e
					} 
			}
		}
		try { 
			lists = yield Catagory.findOne(obj)
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