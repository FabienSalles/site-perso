require(["google", "mootools-core"], function () {
			
	window.addEvent( 'load' , function(){
		
		require(["order!element", "order!slider", "stars"], function (element, Slider, Stars) {
			
			// slider instanciation
			var slider = new Slider({
				elem : element
			});
			// Skills notation
			var stars = new Stars('.star');
		});
	});
});