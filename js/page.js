define(["mootools-core"], function(){

	// Verify slide selected when the history is change
	window.onpopstate = function(event){
		
		// get id of the url
		var page = document.location.hash.substr(3);
		
		// if the slide isn't selected we reload the page for to render visible
		if(!$("link-"+page).hasClass('selected'))
			document.location.reload();
	}
	
	// get id of the slide in the url
	var page = document.location.hash.substr(1, 1);
	
	return ( page > 1 && page <= 5 ) ? --page : 0 ;
});