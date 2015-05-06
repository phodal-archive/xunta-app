var configs = require('../configs');

module.exports = {
	setupNotifications: function(){
		if( !window.plugins || !window.plugins.pushNotification ){
			return;
		}
		this.pushplugin = window.plugins.pushNotification;
		if( this.isAndroid() ){ 
			this.registerAndroidNotifications();
		}
		else if( this.isIOS() ){
			this.registerIOSNotifications();
		}
	},

	registerAndroidNotifications: function(){
		var senderId = configs.gcm.senderId;
		window.__CPHO_Notify_GCM = function(n){
			this.onGCMNotification(n);
		}.bind(this);
		this.pushplugin.register(
			this.gcmSuccess.bind(this), 
			this.gcmFail.bind(this), {
				senderID: senderId,
				ecb: "window.__CPHO_Notify_GCM"
			});
	},
	registerIOSNotifications: function(){
		window.__CPHO_Notify_APN = function(n){
			this.onAPNNotification(n);
		}.bind(this);

		this.pushplugin.register(
			this.apnSuccess.bind(this),
			this.apnFail.bind(this), {
				"badge": "true",
				"sound": "true",
				"alert": "true",
				"ecb":"window.__CPHO_Notify_APN"
			});
	},

	unregisterNotifications: function(){
		alert("UNREG notifications");
	},

	gcmSuccess: function(msg){

	},

	gcmFail: function(error){

	},

	onGCMNotification: function(n){
		switch(n.event){
			case 'message':
			this.processNotification(n.payload, parseInt(n.foreground));
			break;
			case 'registered':
			this.registerNotificationToken('gcm', n.regid)
			break;
		};
	},

	onAPNNotification: function(e){
		var payload = {
			message: e.alert
		};
		this.processNotification(payload, parseInt(e.foreground));
    /*if (event.badge) {
            console.log("Set badge on  " + pushNotification);
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
          }*/
        },
        processNotification: function(payload, foreground){
  	//if( !foreground && !!payload.goto ){
  	//	this.router.navigate('#' + payload.goto);  
  	//	return;
  	//}
  	this.alert(payload.message);
  },

  apnSuccess: function(token){
  	this.registerNotificationToken('apn', token)
  },

  apnFail: function(msg){

  },

  registerNotificationToken: function(provider, token){
  	//send TOKEN to our servers
  }

};