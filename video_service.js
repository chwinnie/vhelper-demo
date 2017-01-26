
vhelperApp.factory('VideoService', [function () {
        return {
        	video: null,
        	setVideo: function(passedInVideo) {
        		this.video = passedInVideo;
        	},
        	getVideo: function() {
        		return this.video;
        	}
        };
 }]);       	