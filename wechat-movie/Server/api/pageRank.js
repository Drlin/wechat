const Promise = require('bluebird')
const baseUrl = 'http://m.9.cn/app/'
const cheerio = require('cheerio')
const http = require('http')
const Miniapp = require('../models/miniapp');
const Catagory = require('../models/catagory');

$get = (url) => {
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

function *filterHtml (html) {
	const $ = cheerio.load(html);
	let name = $('.elps').text();
	let description = $('.wx-info-content').find('p').text();
	let hot = '';
	let catagoryName = '';
	let icon = $('.obj-img').find('img').attr('src');
	let screenshot = [];
	let catagory = ''
	if (!name) {
		return;
	}
	$('span.c-img').each( function () {
		screenshot.push($(this).children('img').attr('src'));
	});
	$('.mid').each( function () {       
		let author = $(this).children('.author');
        let hot_text = author.eq(1).text();
        let catagory_text = author.eq(0).text().split('：')[1];
        hot = hot_text.slice(3);
        catagoryName = catagory_text.split('  ')[1];
    });
    let _catagory = yield Catagory.findOne({name: catagoryName}).exec();
    if (!_catagory) {
    	let catagoryItem = new Catagory({name: catagoryName});
    	 _catagory = yield catagoryItem.save()
    }
    catagory = _catagory._id;
    let _miniapp = new Miniapp({
    	name, description, hot, catagoryName, icon, screenshot, catagory
    })
    let miniapp = yield _miniapp.save();
    _catagory.miniapp.push(miniapp._id);
    yield _catagory.save();
}

module.exports = {
	pageRank: function *(next) {
		let promiseArr = [];
		for (let i = 1501; i < 2000 ; i ++) {
			yield timeout(1000);
			try {
				let html = yield $get(`${baseUrl}${i}`)
				yield filterHtml(html)
			} catch(e) {
				//console.log(e)
			}
		}	

		// let promiseResultArr = yield Promise.all(promiseArr);
		// for (let i = 0; i < promiseResultArr.length; i ++) {
		// 	yield filterHtml(promiseResultArr[i])
		// }
		this.body = {
			status: 0,
			data: '抓取成功'
		}
	}
}