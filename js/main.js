require(["js/google", "order!js/mootools-core", "order!js/mootools-more"], function () {
			
	window.addEvent( 'load' , function(){
		
		require(["order!js/element", "order!js/slider", "js/stars"], function (element, Slider, Stars) {
			
			// slider instanciation
			var slider = new Slider({
				elem : element
			});
			// Skills
			var stars = new Stars('.star');
		});
	});
});