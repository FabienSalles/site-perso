/**
 * Slider class
 */
var Slider = new Class({
		
	/** Inheritance */
	Implements	: Options,
	
	/** Options */
	options		: {
		left		: 0
	},
	
	/** Constructor */
	initialize	: function(options){
		 
		// Container
		this.container 				= $( 'page' );
		
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
		
		// Page in focus
		this.page = 0;
		
		//Elements
		this.elem = [
			{
				title	: 'Accueil',
				id		: 'link-home'
			},
			{
				title 	: 'Formation',
				id		: 'link-formation'
			},
			{
				title 	: 'Expériences',
				id		: 'link-experience'
			},
			{
				title 	: 'Compétences',
				id		: 'link-skill'
			},
			{
				title 	: 'Contact',
				id		: 'link-contact'
			}
		];
		
		// Merge defaults and instanciations options
		this.setOptions(options);
		
		// Events
		this.setEvents();
		
		// Set width of the slider
		this.setSyleForWidth();
	
	},
	
	/** Set all events for the slider */
	setEvents		: function(){
		
		// Slider Events 
		this.slider.addEvents({
			start 		:  this.onStart.bind( this ),
			complete 	: this.onComplete.bind( this )
		});
		
		// Nav Events
		Object.each(this.elem, this.setNavEvent.bind( this ));
		
		// Window Event for responsive slider
		window.addEvent( 'resize', this.setSyleForWidth.bind( this ));
	},
	
	/** Set click events in navbar */
	setNavEvent	: function(elem, i){
		
		// Remove Events for reuse this function for 
		// create responsive slider with other dimension
		$(elem.id).removeEvents( 'click' );
		
		// Create Event slide
		$(elem.id).addEvent( 'click', this.slide.bind( this, i ));
	},
	
	/** Slide width val of the left position */
	slide 			: function( i ){
		
		if(!this.inProgress){
			
			this.page = i;
			
			this.options.left = -this.width*i;
			
			this.slideEffect();
		}
	},
	
	/** Slide effect */
	slideEffect		: function(){
		
		// Set width of the slider for create animation
		this.slider.start({
			'left' : this.options.left
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
	setSyleForWidth		: function(){
		
		// retrieve width of the window
		var width = document.body.getStyle('width').toInt();
		
		if(width < this.baseWidth){

			// set width
			this.width = width;
			
			// change Slider width
			this.changeSliderWidth();
		} 
		else {
			
			// Reuse default values
			this.width = this.baseWidth;
			
			this.changeSliderWidth();
		}
	},
	
	/** Change slider width properties */
	changeSliderWidth	: function(){
		
		// set width of containers
		$$('.content').setStyle('width',this.width-20);
		
		// set width for to use the real values for nav events  
		Object.each(this.elem, this.setNavEvent.bind( this ));

		// Set width position of the container
		this.container.setStyle('left', "-"+(this.width*this.page)+"px" );
		
	}
});

window.addEvent( 'domready' , function(){
	
	var slider = new Slider();
});