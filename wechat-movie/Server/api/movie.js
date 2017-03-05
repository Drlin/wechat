'use strict'

const mongoose = require('mongoose');
const co = require('co');
const koa_request = require('koa-request');
const _ = require('lodash')

const Movie = require('../models/movie');
const Category = require('../models/category');
mongoose.Promise = require('bluebird');

function* findAll() {
	const categories = 
		yield Category.find({})
		.populate({
			path: 'movies',
			select: 'title poster',
			options: {limit: 10}
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
	.find({title: new RegExp(q + '.*', 'i')})
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

function* searchByDouban(content) {
	let url = `https://api.douban.com/v2/movie/search?q=${encodeURIComponent(content)}`;
	const response = yield koa_request(url);
	const data = JSON.parse(response.body)
	const subjects = [];
	if (data && data.subjects) {
		return data.subjects.splice(0, 4);
	}
	return [];
}

module.exports = {
	findAll, 
	searchByCatagory, 
	searchByName, 
	findMoviesByCate,
	searchByDouban
}