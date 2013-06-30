# SmoothSlider

## Overview

A tiny jQuery plugin to create a jank-free sliding carousel.

To keep things light, speedy and hardware-accelerated, SmoothSlider prefers to use CSS to slide your carousel around.

If automatic animation type is left on, it will gracefully degrade from 3D accelerated transforms, to 2D transforms, to jQuery frame-based animation. That way everyone will see your carousel, and hopefully as smoothly as possible.

## JS

Call it like so:

```js
$('.carousel').smoothSlider();
```

or with options like:
```js
	$('.carousel').smoothSlider({
		slideElement: '.carousel-slide',
		animation: 'jquery'
	});
```

The default options are:

```js
$('.carousel').smoothSlider({
	slideWrapper: '.carousel-wrapper', 	// This is the wrapper that sits inside the viewport.
	slideElement: '.carousel-slide', 	// This is the identifier for individual slides.
	pagerElement: '.carousel-pager', 	// These allow you to navigate to individual pages.
	intervalTime: 3000, 				// This is the time that it stays on each slide
	transitionTime: 500,				// This is how long jQuery takes to switch between slides - remember to sync up your CSS with this value
	animation: 'auto'					// Best to leave on default. You can override and hard-set any of the following: "2d", "3d", or "jquery"
});
```

## HTML

The HTML should be in the following structure:

```html
	<div class="carousel">
		<div class="viewport">
			<div class="carousel-wrapper">
				<div class="carousel-slide">
					<img src="http://placekitten.com/960/330" alt="kitty!">
				</div>
				<div class="carousel-slide">
					<img src="http://placekitten.com/g/960/330" alt="kitty!">
				</div>
				<div class="carousel-slide">
					<img src="http://placekitten.com/960/330" alt="kitty!">
				</div>
			</div>
		</div>
		<ul class="pager">
			<li>
				<a data-slide-target="0" href="#">Slide 1</a>
			</li>
			<li>
				<a data-slide-target="1" href="#">Slide 2</a>
			</li>
			<li>
				<a data-slide-target="2" href="#">Slide 3</a>
			</li>
		</ul>
	</div>
```

Note that the pager data targets are 0-based, so slide 1 is target 0, slide 2 is target 1, etc. 

You can put anything you want inside the slides, images, html, whatever. I haven't tested Flash movies, but maybe they'll work.

## CSS

You need to include some CSS. I've pointedly not made SmoothSlider automatically generate it, as I'd rather give you the power to configure things as you need.

To use the CSS animation, you need to include a bit of CSS. An SCSS file and compiled CSS is included.

Notice the `$slide-width` variable at the top:
```scss
	$slide-width: 980px;
```
As well as the two crucial loops:
```scss
	@for $i from 0 to 20 {
		.slide-position-#{$i} {
			$slide-position: $slide-width*($i)*-1
			@include translate3d($slide-position, 0, 0);
		}
	}
```
and
```scss
	@for $i from 0 to 20 {
		.slide-position-#{$i} {
			$slide-position: $slide-width*($i)*-1
			@include translateX($slide-position);
		}
	}
```
Note that one of them uses translate3d, for hardware-accelerated 3D animation, and one uses translateX, for normal 2D animation. 

These output CSS a bit like this:
```css
	.fp-carousel .animation_3d .slide-position-0 {
		-webkit-transform: translate3d(0px, 0, 0);
		-moz-transform: translate3d(0px, 0, 0);
		-ms-transform: translate3d(0px, 0, 0);
		-o-transform: translate3d(0px, 0, 0);
		transform: translate3d(0px, 0, 0); }
	.fp-carousel .animation_3d .slide-position-1 {
		-webkit-transform: translate3d(-980px, 0, 0);
		-moz-transform: translate3d(-980px, 0, 0);
		-ms-transform: translate3d(-980px, 0, 0);
		-o-transform: translate3d(-980px, 0, 0);
		transform: translate3d(-980px, 0, 0); }
	.fp-carousel .animation_3d .slide-position-2 {
		-webkit-transform: translate3d(-1960px, 0, 0);
		-moz-transform: translate3d(-1960px, 0, 0);
		-ms-transform: translate3d(-1960px, 0, 0);
		-o-transform: translate3d(-1960px, 0, 0);
		transform: translate3d(-1960px, 0, 0); }
```
Gosh! What a fuss! What's all that about? Well, I'll tell you. That's how the sliding on the slider works. We set the slide-position-*x* class, and it moves the right amount. 

To set it up for your slide width, just change the slide-width variable to your slide's width **including** border, padding and margin. For instance, a 420px slide with a 1px border on either side, 10px of padding on either side, and a 20px right-hand margin should come out at: `420 + (1px x 2) + (10px x 2) + 20px = 462px` per slide.

I am generating rules for up to 20 slides by default, but you can change that too. See the "from 0 to 20" bit? Change the 20 to your target number.

If you can't be bothered with all that SCSS stuff, just take the following code block, tweak it to your liking, and whack it through something like http://c2c.briangonzalez.org/
```scss
	$slide-width: 980px;
	.animation_3d {
		@for $i from 0 to 20 {
			> .slide-position-#{$i} {
				$slide-position: $slide-width*($i)*-1;
				@include translateX($slide-position);
			}
		}
	}

	.animation_2d{
		@for $i from 0 to 20 {
			> .slide-position-#{$i} {
				$slide-position: $slide-width*($i)*-1;
				@include translate3d($slide-position, 0, 0);
			}
		}
	}
```
## Todo

There's loads to do.

- (optionally) output necessary CSS from the JS
- Add option to disable pager
- Add fade option (?) (SmoothFader? Could make a quirky 80s hip-hop hair inspired website. Hacker News would hate it so hard.)
- Investigate any further possible dejanking
- Responsiveness (no mean feat)
- Do the above while keeping it small and speedy

This is made by Jodi Warren. I'm a Senior Web Developer at http://coopa.net, a small but powerful web design and development agency in London.