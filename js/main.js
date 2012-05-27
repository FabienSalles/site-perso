/**
 * Slider class
 */
var Slider = new Class({
		
	/** Inheritance */
	Implements	: Options,
	
	/** Options */
	options		: {
		left		: 0,	// Default left position
		page		: 0		// Default page focus
	},
	
	/** Constructor */
	initialize	: function(options){
		 
		// Container
		this.container 	= $( 'page' );
		
		// Slider Effect
		this.slider		= new Fx.Morph(this.container, {
			transition 	: Fx.Transitions.Circ.easeInOut,
			duration 	: 800
		});
		
		// Stop the slider when he is in progress
		this.inProgress = false;
		
		// Largeur of the container of the slider
		this.baseWidth = 840;
		this.width = 840;
		
		//Elements
		this.elem = [
			{
				title	: 'Accueil',
				link	: $( 'link-home' ),
				page	: $( 'home' )
			},
			{
				title 	: 'Formation',
				link	: $( 'link-formation' ),
				page	: $( 'formation' )
			},
			{
				title 	: 'Expériences',
				link	: $( 'link-experience' ),
				page	: $( 'experience' )
			},
			{
				title 	: 'Compétences',
				link	: $( 'link-skill' ),
				page	: $( 'skills' )
			},
			{
				title 	: 'Contact',
				link	: $( 'link-contact' ),
				page	: $( 'contact' )
			}
		];
		
		// Merge defaults and instanciations options
		this.setOptions(options);
		
		// set value of the height of the page
		this.options.height = this.elem[this.options.page].page.getStyle('height');

		
		// Events
		this.setEvents();
		
		// Set style of the slider
		this.setSyle();
		
		this.options.page && this.slide(this.options.page);
			
	
	},
	
	/** Set all events for the slider */
	setEvents		: function(){
		
		// Slider Events 
		this.slider.addEvents({
			start 		: this.onStart.bind( this ),
			complete 	: this.onComplete.bind( this )
		});
		
		// Window Event for responsive slider
		window.addEvent( 'resize', this.setSyle.bind( this ));
		
		return this;
	},
	
	/** Set click events in navbar */
	setNavEvent	: function( elem, i ){
		
		// Remove Events for reuse this function for 
		// create responsive slider with other dimension
		elem.link.removeEvents( 'click' );
		
		// Create Event slide
		elem.link.addEvent( 'click', this.slide.bind( this, i ));
	},
	
	/** Slide width val of the left position */
	slide 			: function( i ){

		if(!this.inProgress && this.options.page !=i){
			
			this.options.page = i;
			
			this.options.left = -this.width*i;
			this.options.height = this.elem[i].height;
			
			this.slideEffect();
		}
		
		return this;
	},
	
	/** Slide effect */
	slideEffect		: function(){
		
		// Set width of the slider for create animation
		this.slider.start({
			'left' 		: this.options.left,
			'height' 	: this.options.height
		});
	},
	
	/** Allow to stop click events for the slider */
	onStart 		: function(){
		
		// Use for stop slider when he is in progress
		this.inProgress = true;
	},
	
	/** Allow to use slider */
	onComplete		: function(){
		
		// Use for reuse slider
		this.inProgress = false;
	},
	
	
	/** Allow to create responsive Slider */
	setSyle			: function(){
		
		// retrieve width of the window
		var width = document.body.getStyle('width').toInt();
		
		if(width < this.baseWidth){
			// set width
			this.width = width;
		} 
		else {
			// Reuse default values
			this.width = this.baseWidth;
		}
		
		// set height of pages
		//Object.each(this.elem, this.setHeightOfPages.bind( this ));
		//$$('.content').setStyle('height',this.elem[this.options.page].page.getStyle('height'));
		
		// set width of containers
		$$('.content').setStyle('width',this.width-20);
		
		// Set left position of the container
		this.container.setStyle('left', "-"+(this.width*this.options.page)+"px" );
		
		// set width for to use the real values for nav events  
		Object.each(this.elem, this.setNavEvent.bind( this ));
	},
	
	/** Set height values of all pages */
	setHeightOfPages	: function(elem){		
		
		elem.page.setStyle('height', '')
		elem.height = elem.page.getStyle('height');
		console.log(elem.height);
	}
});

/**
 * Class Star
 */
var Stars = new Class({
	
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
		
window.addEvent( 'domready' , function(){
	
	var slider = new Slider();

	var stars = new Stars('.star');
});