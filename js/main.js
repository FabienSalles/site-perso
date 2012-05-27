require(["js/google.js", "order!js/mootools-core.js", "order!js/mootools-more.js"], function () {
			
	window.addEvent( 'load' , function(){
		
		require(["js/slider.js", "js/stars.js"], function () {
			
			// slider instanciation
			var slider = new Slider();
			
			// creation of the note of the skills
			var stars = new Stars('.star');
			
		});
	});
});