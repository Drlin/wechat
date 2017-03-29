const mongoose = require('mongoose');
const Collection = require('../models/collection');

module.exports = {
	save: function *(next) {
		const from = this.state.user._id;
		const miniapp = this.request.body.miniapp;
		const _collection = new Collection({
			from, miniapp
		})
		const collections = '';
		try {
			collections = yield Collection.findOne({miniapp, from}).exec();
		} catch(e) {
			return this.body = {
				status: 1,
				msg: '保存失败'
			}
		}
		if (collections) {
			return this.body = {
				status: 1,
				msg: '已保存'
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
	cancel: function *(next) {
		const from = this.state.user._id;
		const miniapp = this.request.body.miniapp;
		try {
			yield Collection.remove({ from,  miniapp}).exec();
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
}