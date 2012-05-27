require(["js/google.js", "order!js/mootools-core.js", "order!js/mootools-more.js"], function () {
			
	window.addEvent( 'load' , function(){
		
		require(["js/slider.js", "js/stars.js"], function (Slider, Stars) {
			
			// slider instanciation
			var slider = new Slider();
			var stars = new Stars('.star');
		});
	});
});