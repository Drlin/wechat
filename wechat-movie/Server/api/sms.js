const https = require('https');
const speakeasy = require('speakeasy');
const Promise = require('bluebird')
const querystring = require('querystring');


exports.getCode = function() {
	let code = speakeasy.totp({
		secret: 'lin',
		digits: 6
	})
	return code;
}

exports.send = function (code, phoneNum) {
	return new Promise((resolve, reject) => {
		const postData = {
	    mobile: phoneNum,
	    message: `您的验证码为: ${code},打死不能说哦。【李小花】`
	};

	const content = querystring.stringify(postData);

	const options = {
	    host: 'sms-api.luosimao.com',
	    path: '/v1/send.json',
	    method: 'POST',
	    auth: 'api: dcb780337ed66586f5d3aa6ac4606334',
	    agent: false,
	    rejectUnauthorized: false,
	    headers: {
	    'Content-Type': 'application/x-www-form-urlencoded',
	    'Content-Length': content.length
	    }
	};
	let json = ''
	const req = https.request(options, (res) => {
	    res.setEncoding('utf8');
	    res.on('data',  (chunk)=> {
	    	json = chunk;
	    });
	    res.on('end', ()=> {
	    	let data = JSON.parse(json);
	    	if (data.error === 0) {
	    		resolve();
	    	} else {
	    		reject(new Error(data))
	    	}
	    });
	});

	    req.write(content);
	    req.end();
	})
}


