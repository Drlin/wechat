const Promise = require('bluebird')
const baseUrl = 'http://m.9.cn/app/'
const cheerio = require('cheerio')
const http = require('http')
request = (url) => {
	return new Promise((resolve, reject) => {
		http.get(url, (res)=> {
			let html = '';
			res.on('data', (data) => {
				html += data;
			})
			res.on('end', () => {
				resolve(html)
			})
		})
		.on('error', (error) => {
			reject(error)
		})
	})
}
timeout = (time) => {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, time);
	})
}

module.exports = {
	pageRank: function *(next) {
		let promiseArr = [];
		for (let i = 0 ; i < 19 ; i ++) {
			yield timeout(1000);
			promiseArr.push(request(`${baseUrl}${i}`))
		}	

		yield Promise.all(promiseArr).then((pages) => {
			pages.map((item) => {
				var $ = cheerio.load(item);
			})
		})
		
		this.body = {
			status: 0,
			data: 3
		}
	}
}