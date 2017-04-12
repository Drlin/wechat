const mongoose = require('mongoose');
const Verify = require('../models/verify');

const qiniu = require('../api/qiniu');

module.exports = {
	*apply () {
		const from = this.state.user._id;
		let obj = this.request.body;
		let _verify = new Verify(Object.assign(obj, {from}));
		let verify;
		try {
			verify = yield _verify.save();
			this.body = {
				status: 0,
				msg: '保存成功'
			}
		} catch(e) {
			this.body = {
				status: 1,
				msg: '保存失败'
			}
		}
		try {
			let {icon, qrcode, screenshot} = _verify;
			let arr = []
			_verify.icon = yield qiniu.getMedia(icon);
			_verify.qrcode = yield qiniu.getMedia(qrcode);
			for (let i = 0; i < screenshot.length; i++) {
				 arr.push(yield qiniu.getMedia(screenshot[i]))
			}
			_verify.screenshot = arr;
		} catch (e) {
			console.log(e)
		}
		try {
			yield Verify.remove({id: verify.id});
			yield _verify.save();
		} catch (e) {
			console.log(e);
		}
	},
	*lists () {
		let lists;
		try {
			lists 
				= yield Verify.find({})
							.populate({
								path: 'catagory', 
								select: {name: 1}
							})
							.exec();
		} catch(e) {
			this.body = {
				status: 1,
				msg: '查询失败'
			}
		}
		this.body = {
			status: 0,
			msg: lists
		}
	},
	*userLists () {
		const from = this.state.user._id;
		let lists;
		try {
			lists 
				= yield Verify.find({from})
							.populate({
								path: 'catagory', 
								select: {name: 1}
							})
							.exec();
		} catch(e) {
			console.log(e)
			this.body = {
				status: 1,
				msg: '查询失败'
			}
		}
		this.body = {
			status: 0,
			data: lists
		}
	}
}