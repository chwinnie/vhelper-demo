var vhelperApp = angular.module('vhelperApp', ['vjs.video', 'ngRoute', 'ui.bootstrap', 'firebase', 'youtube-embed']);

var config = vhelperApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
	$httpProvider.defaults.useXDomain = true;

	$routeProvider
		.when('/', {
	        controller: 'HomeController',
	        templateUrl: 'home.html'
	    })
	    .when('/video/:videoId', {
	        controller: 'VideoController',
	        templateUrl: 'video.html'
	    });
}]);

config.run(['$rootScope', '$location', 'YoutubeApiService', function($rootScope, $location, YoutubeApiService) {
	$rootScope.mode = 'click';
	$rootScope.allowRelatedVideos = false;

	var firebaseConfig = {
		apiKey: "",
		authDomain: "",
		databaseURL: "",
		storageBucket: "test",
	};

	firebase.initializeApp(firebaseConfig);

	YoutubeApiService.load();
	
}]);
