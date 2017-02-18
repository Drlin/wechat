'use strict'

const fs = require('fs');
const Promise = require('bluebird');	

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
	}
}	