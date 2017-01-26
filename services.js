vhelperApp.factory('YoutubeApiService', ['$rootScope', function($rootScope) {
	var methods = {
		isLoaded: null,
		load: function() {
			var me = this;
			var onLoadFn = function() {
			    var googleApiKey = 'AIzaSyAzAMJugWkh5EWnUAQB54tzkAm7S-0_5C8';
				gapi.client.setApiKey(googleApiKey);
				gapi.client.load('youtube', 'v3').then(function() {
					me.isLoaded = true;
				});
		  	}
	  		gapi.load("client", onLoadFn);
		}
	};
	return methods;
}]);