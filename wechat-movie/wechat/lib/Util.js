'use strict'

const fs = require('fs');
const Promise = require('bluebird');
const xml2js = require('xml2js');	
const tpl = require('../tpl')

module.exports = {
	readFileAsync(fpath, encoding) {
		return new Promise((resolve, reject) => {
			fs.readFile(fpath, encoding, (err, content) => {
				if (err) {
					return reject(err)
				}
				resolve(content)
			})
		})
	},
	writeFileAsync(fpath, content) {
		return new Promise((resolve, reject) => {
			fs.writeFile(fpath, content, (err) => {
				if (err) {
					return reject(err)
				}
				resolve()
			})
		})
	},
	deleteFileAsync(fpath, content) {
		return new Promise((resolve, reject) => {
			fs.unlink(fpath, (err) => {
				if (err) {
					return reject(err)
				}
				resolve()
			})
		})
	},
	parseXMLAsync(xml) {
		return new Promise((resolve, reject) => {
			xml2js.parseString(xml, {trim: true}, (err, content) => {
				if (err) {
					return reject(err)
				} 
				return resolve(content);
			})
		})
	},
	formatMessage(result) {
		const message = {}
  		if (typeof result === 'object') {
    		let keys = Object.keys(result)
		    for (let i = 0; i < keys.length; i++) {
	        let item = result[keys[i]]
	        let key = keys[i]
		    if (!(item instanceof Array) || item.length === 0) {
		        continue
		    }
		    if (item.length === 1) {
		        let val = item[0]
		        if (typeof val === 'object') {
		          message[key] = formatMessage(val)
		        }
		        else {
		          message[key] = (val || '').trim()
		        }
		      }
		      else {
		        message[key] = []
		        for (let j = 0, k = item.length; j < k; j++) {
		          message[key].push(formatMessage(item[j]))
		        }
		      }
		    }
		 }
		return message
	},
	tpl(content, message) {
		const info = {};
		let type = 'text';
		const FromUserName = message.FromUserName;
		const ToUserName = message.ToUserName;
		if (Array.isArray(content)) {
			type = 'news'
		}
		type = (content && content.type) || type;
		info.Content = content;
		info.CreateTime = Date.now();
		info.MsgType = type;
		info.FromUserName = FromUserName;
		info.ToUserName = ToUserName;
		return tpl.compiled(info);
	}
}	