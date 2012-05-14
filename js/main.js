/**
 * Slider class
 */
var Slider = new Class({
		
	/** Inheritance */
	Implements	: Options,
	
	/** Options */
	options		: {
		left		: 0,
		minLeft		: -this.width*4
	},
	
	/** Constructor */
	initialize	: function(options){
		 
		// Container
		this.page 				= $( 'page' );
		this.leftArrow			= $( 'left-arrow' );
		this.rightArrow			= $( 'right-arrow' );
		this.labelLeftArrow 	= this.leftArrow.getElement('span');
		this.labelRightArrow 	= this.rightArrow.getElement('span');
			
		// Slider Effect
		this.slider		= new Fx.Morph(this.page, {
			transition 	: Fx.Transitions.Circ.easeInOut,
			duration 	: 800
		});
		
		// Stop the slider when he is in progress
		this.inProgress = false;
		
		// Largeur of the container of the slider
		this.width = 840;
		
		//Elements
		this.elem = {
			0 : {
				title	: "Accueil",
				link	: $('link-home'),
				left	: 0
			},
			1 : {
				title 	: "Formation",
				link	: $('link-formation'),
				left	: -this.width
			},
			2 : {
				title 	: "Expériences",
				link	: $('link-experience'),
				left	: -this.width*2
			},
			3 : {
				title 	: "Compétences",
				link	: $('link-skill'),
				left	: -this.width*3
			},
			4 : {
				title 	: "Contact",
				link	: $('link-contact'),
				left	: -this.width*4
			}
		}
		
		// Merge defaults and instanciations options
		this.setOptions(options);
		
		if( !this.options.left )
			this.leftArrow.setStyle( 'display' , 'none');
		
		// -- Events --//
		this.setEvent();
	
	},
	
	/** Set all events for the slider */
	setEvent		: function(){
		
		this.leftArrow.addEvent( 'click' , this.slideLeft.bind( this ) );
		this.rightArrow.addEvent( 'click' , this.slideRight.bind( this ) );
		
		this.slider.addEvent( 'start' , this.onStart.bind( this ) );
		this.slider.addEvent( 'complete' , this.onComplete.bind( this ) );
		
		Object.each(this.elem, this.setNavEvent.bind( this ));
	},
	
	/** Set click events in navbar */
	setNavEvent	: function(elem){
		
		elem.link.addEvent( 'click', this.slide.bind( this, elem.left ));
	},
	
	/** Slide left */
	slideLeft 		: function(){
		
		if(!this.inProgress){

			this.options.left += this.width;
			
			this.slideEffect();
		}
		return false;
	},
	
	/** Slide Right */
	slideRight 		: function(){
		
		if(!this.inProgress){			
			
			this.options.left -= this.width;
			
			this.slideEffect();
		}
		
		return false;
	},
	
	/** Slide width val of the left position */
	slide 			: function( left ){
		
		if(!this.inProgress){
			
			this.options.left = left;
			
			this.slideEffect();
		}
		
		return false;
	},
	
	/** Slide effect */
	slideEffect		: function(){
		
		this.slider.start({
			'left' : this.options.left
		});
		
		this.setArrows();
	},
	
	/** Allow to stop click events for the slider */
	onStart 		: function(){
		
		this.inProgress = true;
	},
	
	/** Allow to use slider */
	onComplete		: function(){
		
		this.inProgress = false;
	},
	
	/** Change States of left and right Arrows */
	setArrows		: function(){
		
		switch( this.options.left ){
		
			case -this.width	:
				this.setStyleArrows('block', 'block');
				this.setLabelArrows( 0, 2 );
				break;
				
			case -this.width*2	:
				this.setStyleArrows('block', 'block');
				this.setLabelArrows( 1, 3 );
				break;
				
			case -this.width*3	:
				this.setStyleArrows('block', 'block');
				this.setLabelArrows( 2, 4 );
				break;
			
			case -this.width*4	:
				this.setStyleArrows('block', 'none');
				this.setLabelArrows( 3, false );
				break;
				
			default				:
				this.setStyleArrows('none', 'block');
				this.setLabelArrows( false, 1 );
				break;
		}
	},
	
	/** Change label for the left and right arrows */
	setLabelArrows	: function(left, right){
		
		if(left!==false){
			this.labelLeftArrow.set('html', this.elem[left].title);
		}
			
		if(right!==false){
			this.labelRightArrow.set('html', this.elem[right].title);
		}
			
			
	},
	
	setStyleArrows: function(left, right){
		this.leftArrow.setStyle( 'display' , left );
		this.rightArrow.setStyle( 'display' , right );
	}
});

window.addEvent( 'domready' , function(){
	
	var slider = new Slider();
});