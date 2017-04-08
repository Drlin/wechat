const mongoose = require('mongoose');
const Verify = require('../models/verify');

const qiniu = require('../api/qiniu');

module.exports = {
	apply: function *() {
		const from = this.state.user._id;
		let obj = this.request.body;
		let _verify = new Verify(Object.assign(obj, from));
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
			let {icon, qrcode, screenshot} = verify;
			let arr = []
			verify.icon = yield qiniu.getMedia(icon);
			verify.qrcode = yield qiniu.getMedia(qrcode);
			for (let i = 0; i < screenshot.length; i++) {
				 arr.push(yield qiniu.getMedia(screenshot[i]))
			}
			verify.screenshot = arr;
		} catch (e) {
			console.log(e)
		}
		try {
			yield Verify.update({id: verify.id}, verify)
		} catch (e) {
			console.log(e);
		}
	}
}