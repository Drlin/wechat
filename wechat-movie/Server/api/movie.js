'use strict'

const mongoose = require('mongoose');
const co = require('co');
const koa_request = require('koa-request')
const request = Promise.promisify(require('request'))
const _ = require('lodash')

const Movie = mongoose.model('Movie');
const Category = mongoose.model('Category')


function* findAll() {
	const categories = 
		yield Category.find({})
		.populate({
			path: 'movies',
			select: 'title poster',
			options: {limit: 6}
		})
		.exec()
	return categories;
}

function* searchByCatagory(cataId) {
	const categories = yield Category
	.find({_id: cataId})
	.populate({
		path: 'movies',
		select: 'title poster'
	}).exec()
	return categories;
}

function* searchByName(q) {
	const movies = yield Movie
	.find({title: new RegExp(`${1}.*`, 'i')})
	.exec()
	return movies;
}

function* findMoviesByCate(cat) {
  var category = yield Category
      .findOne({name: cat})
      .populate({
        path: 'movies',
        select: 'title poster _id'
      })
      .exec()

  return category
}

module.exports = {
	findAll, searchByCatagory, searchByName, findMoviesByCate
}