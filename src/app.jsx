/** @jsx React.DOM */
var $ = require('jquery');
var React = require('react');
var FastClick = require('fastclick');
var LayoutUser = require('./components/layoutUser');
var Dialogs = require('./components/dialogs');

var RouterStore = require('./flux/stores/router');

React.initializeTouchEvents(true);

module.exports = React.createClass({

	mixins: [ RouterStore.mixin() ],
	
	router: require('./util/router'),

	routes: require('./routes'),

	getStateFromStores: function(){
		return {
			path: RouterStore.get('path'),
			routeParams: RouterStore.get('routeParams'),
			page: RouterStore.get('page')
		};
	},
	
	componentDidMount: function(){
		this.initApp();
		this.router.start(this.routes);
	},

	initApp: function(){
		document.addEventListener('backbutton', this.handleBackButton, false);
		document.addEventListener('offline', this.onOffline, false);
		document.addEventListener('online', this.onOnline, false);
		document.addEventListener("resume", this.onResume, false);
		if( this.isAndroid() ){
			this.initAndroid();
		}
		if( this.isIOS() ){
			this.initIOS();
		}
		FastClick.attach(document.body, {});
	},

	initAndroid: function(){
		$(document.body).addClass('android');
	},

	initIOS: function(){
		$(document.body).addClass('ios');
		if( this.isIOS7() ){
			this.initIOS7();
		}
	},

	initIOS7: function(){
		$(document.body).addClass('ios7');
	},

	handleBackButton: function(){
		switch( this.state.path ){
			case '':
				Dialogs.confirm('Exit app?', this.exit);
			break;
			case 'juba':
			case 'blog':
			case 'link':
			this.router.navigate('/');
			break;
			default:
			this.router.back();
			break;
		}
	},
	
	onOffline: function(){
		this.setState({
			offline: true
		})
	},
	
	onOnline: function(){
		this.setState({
			offline: false
		})
	},

	onResume: function(){
		
	},
	
	exit: function(){
		navigator.app.exitApp();
	},
		
	isBrowser: function() {
		var url = document.URL;
		return !(url.indexOf("http://") === -1 && url.indexOf("https://") === -1);
	},

	getPlatform: function(){
		var platform = '';
		if( !!window.device && !!window.device.platform ){
			platform = window.device.platform.toLowerCase();
		}
		return platform;
	},

	isAndroid: function() {
		return (this.getPlatform() == "android");
	},

	isIOS: function() {
		return (this.getPlatform() == "ios")
	},

	isIOS7: function(){
		return this.getIOSVersion() >= 7;
	},

	getIOSVersion: function() {
		if (!this.isIOS()) {
			return null;
		}
		if (!this.iosVersion) {
			var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
			this.iosVersion = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
			this.iosVersion = parseInt(this.iosVersion[0]);
		}
		return this.iosVersion;
	},
	
	getDeviceUuid: function() {
		return !!window.device ? window.device.uuid : null;
	},

	render: function(){
		if( !this.state.page ){
			return <div>loading...</div>;
		}

		var page = new this.state.page({
			routeParams: this.state.routeParams
		});

		return (<LayoutUser back={this.handleBackButton}>{page}</LayoutUser>);
	}
});
