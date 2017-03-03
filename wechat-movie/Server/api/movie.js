'use strict'

const mongoose = require('mongoose');
const co = require('co');
const koa_request = require('koa-request')
const request = Promise.promisify(require('request'))
const _ = require('lodash')

const Movie = mongoose.model('Movie');
const Category = mongoose.model('Category')


function* findAll() {
	const 
}