const mongoose = require('mongoose');
const Collection = require('../models/collection');

module.exports = {
	operate: function *(next) {
		const from = this.state.user._id;
		const miniappId = this.request.body.miniappId;
		const _collection = new Collection({
			from, miniapp: miniappId
		})
		let collections = '';
		try {
			collections = yield Collection.findOne({miniapp: miniappId, from}).exec();
		} catch(e) {
			return this.body = {
				status: 1,
				msg: '保存失败'
			}
		}
		if (collections) {
			try {
				yield Collection.remove({ from,  miniapp: miniappId}).exec();
			} catch(e) {
				return this.body = {
					status: 1,
					msg: '删除失败'
				}
			}
			return this.body = {
				status: 0,
				msg: '删除成功'
			}
		}
		try {
			yield _collection.save();

		} catch(e) {
			return this.body = {
				status: 1,
				msg: '保存失败'
			}
		}
		return this.body = {
			status: 0,
			msg: '保存成功'
		}
	},
	collectionList: function *(next) {
		const from = this.state.user._id;
		const miniappId = this.query.miniappId;
		let collections = [];
		try {
			collections = yield Collection.find({from, miniapp: miniappId}).exec();
		} catch(e) {
			return this.body = {
				status: 1,
				msg: '保存失败'
			}
		}
		return this.body = {
			status: 0,
			data: collections
		}
	}
}