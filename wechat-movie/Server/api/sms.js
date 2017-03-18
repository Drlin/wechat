const speakeasy = require('speakeasy');
const Alidayu = require('alidayujs');

const config = {
        app_key: '23692268',
        secret: 'da427ade157528bce572c8c23ed6a0fe' 
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
		    sms_free_sign_name: '李小花',
		    sms_param: {"code": code},
		    rec_num: phoneNum,
		    sms_template_code: 'SMS_53875163'
		}, (result) => {
	        if (result.error_response) {
				reject(result);
			}
			resolve();
		});
    });
}


