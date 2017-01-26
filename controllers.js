vhelperApp.controller('HomeController', ['$scope', '$location', '$rootScope', '$firebaseObject', '$firebaseArray',
		function($scope, $location, $rootScope, $firebaseObject, $firebaseArray) {
	
	$scope.mode = $rootScope.mode;
	$scope.allowRelatedVideos = $rootScope.allowRelatedVideos;
	var trackingRef = firebase.database().ref().child("tracking");

	$scope.$watch('mode', function(newModeVal) {
		$rootScope.mode = newModeVal;
		trackingRef.push().set( {
			time: Firebase.ServerValue.TIMESTAMP,
			event: newModeVal
		});
	});

	$scope.$watch('allowRelatedVideos', function(newRelatedSetting) {
		$rootScope.allowRelatedVideos = newRelatedSetting;
	});

	var video_names = ['lion_king', 'bare_necessities', 'toy_story', 'mulan'];
	$scope.formatted_video_names = ['lion king', 'jungle book', 'toy story', 'mulan'];

	var ref = firebase.database().ref().child("data");
  	// download the data into a local object
	var syncObject = $firebaseObject(ref);
  	// synchronize the object with a three-way data binding
   	syncObject.$bindTo($scope, "data");

   	$scope.data = {};
   	$scope.data.text = "data text valule initialized in controller";

	var linkMapRef = firebase.database().ref().child("linkMap");
	$scope.youtubeImageLinkMap = $firebaseArray(linkMapRef);

	var query = linkMapRef.orderByChild("rank").limitToFirst(50);
	$scope.videoList = $firebaseArray(query);

	$scope.clickedVideo = function(videoId) {
		if ($rootScope.mode === 'click') {
			$location.path('/video/' + videoId);
		}
	}

	$scope.$watch('search.query', function(newSearchVal) {
		if ($rootScope.mode === 'type') {
			var selectedVideo = _.find($scope.videoList, function(video) { 
				return video.name.toLowerCase() === newSearchVal.toLowerCase();
			});
			if (selectedVideo) {
				$location.path('/video/' + selectedVideo.id);
			}
		}
	});

	$scope.search = {};
	$scope.search.query = "";

}]);

vhelperApp.controller('VideoController', ['$scope', '$rootScope', 'VideoService', '$location', '$routeParams', '$firebaseArray', '$firebase', 'youtubeEmbedUtils', 'YoutubeApiService',
 function($scope, $rootScope, VideoService, $location, $routeParams, $firebaseArray, $firebase, youtubeEmbedUtils, YoutubeApiService) {
 	$scope.videoId = $routeParams.videoId;

 	$scope.goBack = function() {
 		trackingRef.push().set( {
			id: $scope.videoId,
			time: Firebase.ServerValue.TIMESTAMP,
			event: 'back'
		});
 		$location.path('/');
 	}

 	var trackingRef = firebase.database().ref().child("tracking");
  	trackingRef.push().set( {
		id: $scope.videoId,
		time: Firebase.ServerValue.TIMESTAMP,
		event: 'click'
	});

	var mainVideoEmbedId;

	$scope.$watch('mainPlayer', function(mainPlayer) {
		if (mainPlayer) {
			mainVideoEmbedId = mainPlayer.id;
		}
	});

  	$scope.$on('youtube.player.playing', function($event, player) {
  		if (mainVideoEmbedId !== player.id) {
	    	player.stopVideo();
	  		var url = player.getVideoUrl();
	  		var videoId = youtubeEmbedUtils.getIdFromURL(url);
	  		$location.path('/video/' + videoId);	
	    }
  	});

  	$scope.$on('youtube.player.paused', function ($event, player) {
	    trackingRef.push().set( {
			id: $scope.videoId,
			time: Firebase.ServerValue.TIMESTAMP,
			event: 'pause'
		});
  	});

  	$scope.$on('youtube.player.ended', function ($event, player) {
  		trackingRef.push().set( {
			id: $scope.videoId,
			time: Firebase.ServerValue.TIMESTAMP,
			event: 'finished'
		});
	    $location.path('/');
  	});

  	if ($rootScope.allowRelatedVideos) {
  		$scope.relatedVideoIds = [];

	  	var getRelatedVideos = function() {
	  		gapi.client.youtube.search.list({
				part: 'snippet',
				type: 'video',
				relatedToVideoId: $scope.videoId
			}).then(function(response) {
				_.each(response.result.items, function(video) {
					$scope.relatedVideoIds.push(video.id.videoId);
				});
				$scope.$apply();
			});
	  	}

	 	$scope.$watch(function() {
	 		return YoutubeApiService.isLoaded;
	 	}, function(isLoaded) {
	 		if (isLoaded) {
				getRelatedVideos();	
	 		}
	 	});
	 	
  	}

}]);
