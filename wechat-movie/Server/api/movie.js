'use strict'

const mongoose = require('mongoose');
const co = require('co');
const koa_request = require('koa-request');
const _ = require('lodash')

const Movie = require('../models/movie');
const Category = require('../models/category');

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

function searchByName(q) {
	return function(next) {
		console.log(next)
		Movie
		.find({title: new RegExp(q + '.*', 'i')})
		.exec((err, docs) => {
			console.log(docs)
			if (err) {
				return next(err)
			}
			next(null, docs)
		})	
	}
}

function* searchByDouban(content) {
	let url = `https://api.douban.com/v2/movie/search?q=${encodeURIComponent(content)}`;
	let response = yield koa_request(url);
	let data = JSON.parse(response.body)
	let subjects = [];
	let movies = [];
	if (data && data.subjects) {
		subjects = data.subjects.splice(0, 4);
	}
	if (subjects.length > 0) {
		let queryArray = [];
		subjects.forEach((item) => {
			queryArray.push(function *() {
				let movie = yield Movie.findOne({doubanId: item.id})
				if (movie) {
					movies.push(movie);
				} else {
					let directors = item.directors || []
					let director = directors[0] || {}
					let {title, year} = item
					movie = new Movie({
						director: director.name || '',
						title,
						doubanId: item.id,
						poster: item.images.large,
						year,
						genres: item.genres || []
					})

					movie = yield movie.save()
					movies.push(movie)
				}
			})
		})
		yield queryArray;
	}
	return movies;
}

module.exports = {
	findAll, 
	searchByCatagory, 
	searchByName, 
	searchByDouban
}