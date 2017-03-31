const TopClient = require('./topClient').TopClient;
const speakeasy = require('speakeasy');

const client = new TopClient({
    'appkey': '23692268',
    'appsecret': 'da427ade157528bce572c8c23ed6a0fe',
    'REST_URL': 'http://gw.api.taobao.com/router/rest'
});

exports.getCode = function() {
	let code = speakeasy.totp({
		secret: 'lin',
		digits: 6
	})
	return code;
}

exports.send = function (code, phoneNum) {
	return new Promise((resolve, reject) => {
		client.execute('alibaba.aliqin.fc.sms.num.send', {
		    'sms_type': 'normal',
		    'sms_free_sign_name': '李小花',
		    'sms_param': {code: code},
		    'rec_num': phoneNum,
		    'sms_template_code': 'SMS_53875163'
		}, (error, response)=> {
		    if (error) {
				reject(error);
			}
			resolve();
		})
    });
}
 



