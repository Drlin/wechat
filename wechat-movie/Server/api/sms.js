const https = require('https');
const queryString = require('queryString');
const speakeasy = require('speakeasy');

exports.getCode() {
	let code = speakeasy.totp({
		secret: 'lin',
		digits: 6
	})
	return code;
}

exports.send = function (code, phoneNum) {
	const postData = {
		sms_type: normal,
		sms_free_sign_name: '李小花'
		sms_param: {"code": code},
		rec_num: phoneNum,
		sms_template_code: 'SMS_53875163'
	}

	const content = queryString.stringify(postData);

	const options = {

	}
}