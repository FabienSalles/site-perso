require([
"google",
"order!mootools-core",
"order!element",
"order!page",
"order!slider", 
"stars"],
function (google, Mootools, element, page, Slider, Stars) {
			
	window.addEvent( 'load' , function(){
			
		// slider instanciation
		var slider = new Slider({
			elem : element,
			page : page
		});
		// Skills notation
		var stars = new Stars('.star');
	});
});