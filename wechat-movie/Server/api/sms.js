const https = require('https');
const speakeasy = require('speakeasy');
const Alidayu = require('alidayujs');

const config = {
        app_key: '23300111',
        secret: '3403636b338e1003999dd946111111' 
    };

const app = new Alidayu(config);

exports.getCode = function() {
	let code = speakeasy.totp({
		secret: 'lin',
		digits: 6
	})
	return code;
}

exports.send = function (code, phoneNum) {
	return new Promise((resolve, reject) => {
		app.sms({
		    sms_free_sign_name: '小花',
		    sms_param: {"code": code},
		    rec_num: phoneNum,
		    sms_template_code: 'SMS_53875163'
		}, (err,result) => {
	        if (!err) {
				resolve(res);
			} else {
				console.log(err)
				reject(new Error(err))
			}
		});
    });
}