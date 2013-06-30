/**
 * jQuery SmoothSlider plugin
 *
 * version 0.1
 *
 * TODO:
 * Omg so much stuff.
 * - (optionally) output necessary CSS from the JS
 * - Add option to disable pager
 * - Add fade option (?) (SmoothFader? Could make a quirky 80s hip-hop hair inspired website. Hacker News would hate it so hard.)
 * - Investigate any further possible dejanking
 * - Responsiveness
 * - Do the above while keeping it small and speedy
 *
 * by Jodi Warren
 */
/*global Modernizr */
;(function( $ ){
	$.fn.smoothSlider = function(options){
		var settings = $.extend({
			slideWrapper: '.carousel-wrapper',
			slideElement: '.carousel-slide',
			pagerElement: '.carousel-pager', // TODO: false for no pager
			intervalTime: 3000,
			transitionTime: 500,
			animation: 'auto'
		}, options),
		smoothSlider = {};

		smoothSlider.slides = $(settings.slideElement);
		smoothSlider.pager = $(settings.pagerElement);
		smoothSlider.pager_el = smoothSlider.pager.children('li').children('a');
		smoothSlider.wrapper = $(settings.slideWrapper);
		smoothSlider.next_slide = 1;

		/**
		 * If we have can automatically set the best animation type, we will do so. If it's been overridden, then set it to that.
		 * @type {[type]}
		 */
		if (settings.animation === 'auto') {
			if (Modernizr.csstransitions) {
				if (Modernizr.csstransforms3d){
					smoothSlider.animation_type = "3d";
				} else if(Modernizr.csstransforms) {
					smoothSlider.animation_type = "2d";
				} else {
					smoothSlider.animation_type = "jquery";
				}
			} else {
					smoothSlider.animation_type = "jquery";
			}
		} else {
			smoothSlider.animation_type = settings.animation;
		}

		/**
		 * Returns the total width of all slides. Used for setting the width of the wrapper.
		 */
		smoothSlider.slidesWidth = function(){
			var slidesWidthTotal = 0;
			smoothSlider.slides.each(function() {
				slidesWidthTotal += $(this).outerWidth(true);
			});
			return slidesWidthTotal;
		};

		/**
		 * This function sets the carousel and pager classes for you. How nice!
		 */
		smoothSlider.changeClass = function(){
			smoothSlider.wrapper.removeClass(
				function (index, css) {
					return (csmoothSlider.match (/slide-position-\d+/g) || []).join(' ');
				}
			).addClass('slide-position-'+smoothSlider.next_slide);

			smoothSlider.pager_el.each(function() {
				$(this).removeClass('selected').filter('[data-slide-target='+smoothSlider.next_slide+']').addClass('selected');
			});
		};

		/**
		 * This function moves the slide to the next one
		 * @return {[type]} [description]
		 */
		smoothSlider.nextSlide = function(){
			if (smoothSlider.animation_type === "jquery") {
				smoothSlider.wrapper.animate({
					left: smoothSlider.slide_position[smoothSlider.next_slide]
				}, settings.transitionTime);
			}

			smoothSlider.changeClass();

			// If the old next slide (i.e. the new current one) is the last one, set it back to 0.
			if (smoothSlider.next_slide < smoothSlider.slides.length - 1) {
				smoothSlider.next_slide++;
			} else {
				smoothSlider.next_slide = 0;
			}
		};

		smoothSlider.slideTimer_stop = function(){
			clearInterval(smoothSlider.slideTimer);
			smoothSlider.slideTimer = null;
		};

		smoothSlider.slideTimer_start = function(){
			if (!smoothSlider.slideTimer) {
				smoothSlider.slideTimer = window.setInterval(smoothSlider.nextSlide, settings.intervalTime);
			}
		};


		smoothSlider.pager.on('click', 'a', function(event) {
			event.preventDefault();
			smoothSlider.slideTimer_stop();
			smoothSlider.next_slide = $(this).data('slide-target');
			smoothSlider.nextSlide();
			window.setTimeout(smoothSlider.slideTimer_start, 1000);
		});

		smoothSlider.wrapper.hover(function() {
			smoothSlider.slideTimer_stop();
		}, function() {
			smoothSlider.slideTimer_start();
		});

		smoothSlider.getSlidePositions = function(){
			smoothSlider.slide_position = [];
			smoothSlider.slides.each(function(index) {
				var thisSlide = $(this);
				smoothSlider.slide_position[index] = thisSlide.position().left * -1;
			});
		};

		smoothSlider.slideInit  = function(){
			smoothSlider.wrapper.css('width', smoothSlider.slidesWidth()).addClass('slide-position-0').parent().addClass('animation_'+smoothSlider.animation_type);
			if (smoothSlider.animation_type === "jquery") {
				smoothSlider.getSlidePositions();
			}
			smoothSlider.pager_el.eq(0).addClass('selected');
			smoothSlider.slideTimer_start();
		};


		smoothSlider.slideInit();

		return this;
	};
})(jQuery);