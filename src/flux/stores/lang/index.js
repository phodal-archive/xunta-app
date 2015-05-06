module.exports = {
	languages: [{
		name: 'English',
		code: 'en'
	},
	{
		name: 'Chinese',
		code: 'zh'
	}],

	defaultLocale: 'zh',
	
	translations: {
		en: require('./en.js'),
		zh: require('./zh.js')
	}
	
};