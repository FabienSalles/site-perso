define(["js/mootools-core.js"], function(){
	/**
	 * Class Stars
	 */
	return new Class({
		
		/** Constructor */
		initialize	: function( elem ){
			
			// Must be a CSS selector
			this.elem = $$( elem );
			
			// Stars generation
			this.elem.each( this.generateStars.bind( this ) );
		},
		
		generateStars : function( el ){
			
			var note = el.getProperty('data-note'),				// Note of the skill
				integer = note == Math.floor(note),				// Boolean
				stars = new Array,								// Array of stars
				i = 0;											// iterator
			
			if(!integer) note = Math.floor(note);				// If note isn't an integer note becomes an integer
			
			// Full stars
			for(;i<note;i++)
				stars.push(this.createStar(1));
			
			// Half full star
			if(!integer){
				stars.push(this.createStar(2));
				i++;
			}
			
			// Empty stars
			for(;i<5;i++)
				stars.push(this.createStar(3));
			
			el.adopt(stars);
		},
		
		createStar		: function( num ){
			
			return new Element('span.star'+num);
		}
	});
});