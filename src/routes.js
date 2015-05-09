module.exports = {
	'': require('./pages/home'),
	'juba': require('./pages/juba'),
	'link': require('./pages/link'),
	'blog': require('./pages/blog'),
	'blog/:slug': require('./pages/blog/detail'),
	'juba/:slug': require('./pages/juba/detail'),
	'link/:slug': require('./pages/link/detail'),
	'settings': require('./pages/settings')
};