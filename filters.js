vhelperApp.filter('highlight', function($sce) {
  return function(text, phrase) {
  	if (text.toLowerCase() === phrase.toLowerCase()) {
  		if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
      '<span class="highlighted selected">$1</span>');
  	} else {
  		if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
      '<span class="highlighted">$1</span>');
  	}
    
    return $sce.trustAsHtml(text);
  }
});