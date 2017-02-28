const blog = require('../controllers/blog');
const user = require('../controllers/user');
const Comment = require('../controllers/comment');
const Catagory = require('../controllers/catagory');

module.exports = function(app) {
	app.route('/blog')
		.get(blog.list)
		.post(blog.create);

	app.route('/blog/:nid')
		.get(blog.get);

	app.get('/blog:nid', blog.get);

	app.post('/user/signup', user.signup)

	app.post('/user/signin', user.signin)

	app.post('/user/signin', user.signin)

	app.get('/user/logout', user.logout)

	app.get('/user/lists', user.signinRequired, user.adminRequired, user.lists)

	app.post('/admin/comment', user.signinRequired, Comment.save)

	app.post('/admin/catagory', user.signinRequired, Catagory.save)

	app.get('/admin/catagory/list', user.signinRequired, Catagory.list)
}