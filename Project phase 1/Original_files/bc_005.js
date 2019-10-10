var AT_Main = {

	getWidthBrowser : function() { // Get width browser
		var myWidth;

		if( typeof( window.innerWidth ) == 'number' ) {
			//Non-IE 
			myWidth = window.innerWidth;
		} 
		else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) { 
			//IE 6+ in 'standards compliant mode' 
			myWidth = document.documentElement.clientWidth; 
		} 
		else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) { 
			//IE 4 compatible 
			myWidth = document.body.clientWidth;  
		}

		return myWidth;
	}
	
	,checkLayout : function() { // Function to check level of layout
		if(jQuery("#checkLayout .visible-xs-block").css("display") == "block")
			return 1; //mobile layout
		else if(jQuery("#checkLayout .visible-sm-block").css("display") == "block")
			return 2; //tablet potrait layout
		else if(jQuery("#checkLayout .visible-md-block").css("display") == "block")
			return 3; //tablet landscape/medium desktop layout
		else if(jQuery("#checkLayout .visible-lg-block").css("display") == "block")
			return 4; //desktop layout
	}
  
	,homeSlideshow : function(){
        if(jQuery('.home-slideshow-wrapper').length){
            jQuery('.home-slideshow-wrapper').each(function(index,value){
              
                var _delay_time = '';
                if(jQuery(value).data('autoplay')){
                	_delay_time = jQuery(value).data('time');
                }
              
                var swiper = new Swiper('.swiper-container', {
                  	autoplay: _delay_time
                  	,loop: true
                    ,pagination: '.swiper-pagination'
                    ,paginationClickable: '.swiper-pagination'
                    ,nextButton: '.swiper-button-next'
                    ,prevButton: '.swiper-button-prev'
                    ,spaceBetween: 30
                    ,scrollbarDraggable: true
                    ,effect: jQuery(value).data('animation')
                  	,setWrapperSize: false
                    ,onImagesReady: function(swiper){
                    	var slideH = $(swiper.container[0]).find('.swiper-slide > img').height(),
                      		slideW = $(swiper.container[0]).find('.swiper-slide > img').width();
                      	$(swiper.container[0]).find('.swiper-slide > img').css('visibility','hidden');
                      	$(swiper.container[0]).find('.swiper-slide').each(function(){
                          var _this = $(this);
                          _this.find('.video-slide').show();
                          _this.find('.video-slide video').css({
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%,-50%)'
                          });	
                          
                        });
                    }
                });
            });
        }
    }
  
  	,homeIE : function(){
        if(jQuery('.home-slideshow-wrapper').length){
            jQuery('.home-slideshow-wrapper').each(function(index,value){
              
                var _delay_time = '';
                if(jQuery(value).data('autoplay')){
                  _delay_time = jQuery(value).data('time');
                }
              
                var swiper = new Swiper('.swiper-container', {
                    autoplay: _delay_time
                  	,loop: true
                  	,pagination: '.swiper-pagination'
                    ,paginationClickable: '.swiper-pagination'
                    ,nextButton: '.swiper-button-next'
                    ,prevButton: '.swiper-button-prev'
                    ,spaceBetween: 30
                    ,scrollbarDraggable: true
                    ,effect: 'fade'
                  	,setWrapperSize: true
                    ,onImagesReady: function(swiper){
                    	var slideH = $(swiper.container[0]).find('.swiper-slide > img').height(),
                      		slideW = $(swiper.container[0]).find('.swiper-slide > img').width();
                      	$(swiper.container[0]).find('.swiper-slide > img').css('visibility','hidden');
                      	$(swiper.container[0]).find('.swiper-slide').each(function(){
                          var _this = $(this);
                          _this.find('.video-slide').show();
                          _this.find('.video-slide video').css({
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%,-50%)'
                          });	
                          
                        });
                    }
                });
            });
        }
    }
	
	,stickMenu : function() {
		var enable_stick = jQuery(".header-content").data('stick');
		if(enable_stick){
		  //Keep track of last scroll
			var lastScroll = 0;
			var header = jQuery(".horizontal-menu-wrapper");
			var body_content = jQuery("#body-content");

			jQuery(window).scroll(function() {
				//Sets the current scroll position
				var st = jQuery(this).scrollTop();
				//Determines up-or-down scrolling
				if (st > lastScroll) {
					
					//Replace this with your function call for downward-scrolling
					if (st > 250 ) {
						header.addClass("header-fixed fadeInDown animated");
						body_content.addClass("has-header-fixed");
					}
				}
				else {
					//Replace this with your function call for upward-scrolling
					if (st < 250) {
						header.removeClass("header-fixed fadeInDown animated");
						body_content.removeClass("has-header-fixed");
					}
				}
				//Updates scroll position
				lastScroll = st;
			});
		}

	}
	
	,toTopButton : function(){
		var to_top_btn = $("#scroll-to-top");
		if( 1 > to_top_btn.length ){
			return;
		}
		$(window).on( 'scroll' , function() {
			var b = jQuery(this).scrollTop();
			var c = jQuery(this).height();
			if (b > 100) { 
				var d = b + c / 2;
			}
			else { 
				var d = 1 ;
			}

			if (d < 1000 && d < c) { 
				jQuery("#scroll-to-top").removeClass('on off').addClass('off'); 
			} else {
				jQuery("#scroll-to-top").removeClass('on off').addClass('on'); 
			}
		});

		to_top_btn.on( 'click',function (e) {
			e.preventDefault();
			jQuery('body,html').animate({scrollTop:0},800,'swing');
		});
	}

	,mailchipPopup : function(){
		var expire = jQuery("#mailchimp-popup").data('expires');
		if (jQuery.cookie('mycookie')) {
			//it hasn't been one days yet
		}
		else {
			jQuery.fancybox(
				jQuery('#mailchimp-popup'),
				{
					'autoDimensions': false
					,'width'		: 760
					,'height'		: 450
					,'autoSize' 	: false
					,'transitionIn'	: 'none'
					,'transitionOut': 'none'

				}
			);
		}
		jQuery.cookie('mycookie', 'true', { expires: expire });
	}
  
  	,toggleCartSidebar : function(){
		jQuery('.cart-toggle').on('click',function (e) {
			e.stopPropagation();
			AT_Main.fixNoScroll();
			jQuery('.cart-sb').toggleClass('opened');
			jQuery('body').toggleClass('cart-opened');
		});

		jQuery('#page-body').on('click',function () {
			jQuery('.cart-sb').removeClass('opened');
			jQuery('html,body').removeClass('cart-opened');
			AT_Main.fixReturnScroll();
		});
	}
  
    ,handleGridList : function(){
        jQuery(document).on('click','.grid-list span',function(){
            if(!$(this).hasClass('active')){
              $('.grid-list span').removeClass('active');
              $(this).addClass('active');

              if($(this).hasClass('grid')){
                $('.cata-product').removeClass('cp-list');
                $('.product-price-range').removeClass('product-list-item');
                $('.cata-product').addClass('cp-grid');
                $('.product-price-range').addClass('product-grid-item');
              }
              else{
                $('.cata-product').addClass('cp-list');
                $('.product-price-range').addClass('product-list-item');
                $('.cata-product').removeClass('cp-grid');
                $('.product-price-range').removeClass('product-grid-item');
              }
            }
        });
    }
  
  	,effectNavigation : function(){ // Make hover effect of navigation
		jQuery(".horizontal-menu .navigation .navbar-collapse .main-nav>li").hover(function(e){
			jQuery(this).find('>.dropdown-menu, >.dropdown-menu li >.dropdown-menu').addClass("fadeInUp animated");
		},function(e){
			jQuery(this).find('>.dropdown-menu, >.dropdown-menu li >.dropdown-menu').removeClass("fadeInUp animated");
		});
      
      	jQuery(".top-account-holder").hover(function(e){
			jQuery(this).find('>.dropdown-menu').addClass("fadeInUp animated");
		},function(e){
			jQuery(this).find('>.dropdown-menu').removeClass("fadeInUp animated");
		});
      
      	jQuery(".currency-block").hover(function(e){
			jQuery(this).find('>.dropdown-menu').addClass("fadeInUp animated");
		},function(e){
			jQuery(this).find('>.dropdown-menu').removeClass("fadeInUp animated");
		});
      
	}

	,fixNoScroll : function() { // Fixed persitent position of page when scroll disapear
		var windowW = jQuery(window).width();
		jQuery('#page-body, .header-content, #page-body .mobile-version').css("width", windowW + 'px');
	}

	,fixReturnScroll : function() {
		jQuery('#page-body, .header-content,#page-body .mobile-version').attr('style', ''); 
	}

  	,fixButton : function(){
      	jQuery(".product-wrapper .product-head").each(function(e){
            if($(this).children().hasClass('wrapper-countdown')){
              	$(this).find('.product-button').addClass('fix');
            }
  		});
    }
  
  	,handleReviews: function() {
        SPR.registerCallbacks(), SPR.initRatingHandler(), SPR.initDomEls(), SPR.loadProducts(), SPR.loadBadges();
    }
    
	,menuOnMobile : function(){
		jQuery('#page-body').on('click',function () {
			jQuery(".menu-mobile").removeClass("opened");
			jQuery("html,body").removeClass("menu-opened");
			AT_Main.fixReturnScroll();
		});

		jQuery(document).on('click','[data-toggle=offcanvas]',function(e){
			e.stopPropagation();
			AT_Main.fixNoScroll();
			jQuery(".menu-mobile").toggleClass("opened");
			jQuery("html,body").toggleClass("menu-opened")
		});

		jQuery(".navbar .main-nav li").hover(function(){jQuery(this).addClass("hover")},function(){jQuery(this).removeClass("hover")});


		jQuery(document).on('click','.mobile-version .menu-mobile .main-nav .expand',function(){
			var e=jQuery(this).parents(".dropdown").first();
            if (e.hasClass("menu-mobile-open")) {
                e.removeClass("menu-mobile-open");
                $(this).find('.visible-xs').removeClass('fa-minus');
                $(this).find('.visible-xs').addClass('fa-plus');
            } else {
                e.addClass("menu-mobile-open");
              	$(this).find('.visible-xs').removeClass('fa-plus');
                $(this).find('.visible-xs').addClass('fa-minus');
            }
		})

	}
	
	,handleMenuMultiLine : function() {
		var outItem = "";
		var down = false;

		var top = 0;

		jQuery(".navbar-collapse .main-nav > li").on("mousemove", function(e){
			var target = jQuery(e.currentTarget);

			if( down && outItem != "") {
				outItem.addClass("hold");
				setTimeout(function(){
					if(outItem != "")
					outItem.removeClass("hold");
					down = false;
					outItem = "";
				},500);

				if( (outItem[0] == target[0]) || (outItem.offset().top == target.offset().top) )
				{       
					outItem.removeClass("hold");
					down = false;
					outItem = "";
				}
			}
			else {
				outItem = "";
			}

		});

		jQuery(".navbar-collapse .main-nav >li").on("mouseout", function(e){

			var target = jQuery(e.currentTarget);

			if( e.pageY >= target.offset().top + 50 ) { //move down
				down = true;
			}

			if( target.hasClass("dropdown") ) { //target has child

				if(outItem == "")
					outItem = target;
			}

		});
	}
  
  	,parallaxIt : function() {
		if($(".templateIndex").length == 0) 
			return;
		$.fn.parallaxScroll = function(xpos, speedFactor, outerHeight) {
			var elem = $(this);
			var getHeight;
			var firstTop;
			var paddingTop = 0;

			//get the starting position of each element to have parallax applied to it      
			$(this).each(function(){
				firstTop = $(this).offset().top;
			});

			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};

			var j$element, top, height, pos;

			function update(){

				pos = $(window).scrollTop();             
				firstTop = elem.offset().top;
				height = getHeight(elem);
				
				if (pos + $(window).height() < firstTop || pos > firstTop + height) {
				  return;
				}
				//j$this.find('.parallax_bg').transition({ 'y':  Math.round((firstTop - pos) * speedFactor) + "px"},0);

				if(AT_Main.checkLayout()!=1)
				  elem.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px",0);   
				else         
				  elem.css('backgroundPosition', xpos + " " + -Math.round((firstTop - pos) * speedFactor) + "px",0);  
			}       

			window.addEventListener('scroll', function(){ 
				update(); 
			}, false)

			update();
		}; 

		$(".parallax-section").parallaxScroll("50%",0.1);
	}
  
    ,callPriceSlider: function() {
      if( $('#range-slider').length <= 0 ){
      	return;
      }
      
        var _min_price = jQuery('#amount > span.min-val > span.money').html()
        	,_min_price =_min_price.replace(/[^0-9\.]+/g,"")
            ,_min_price = _min_price.match(/\d+(\.\d+)?/g,"")
            ,_max_price = jQuery('#amount > span.max-val > span.money').html()
            ,_max_price =_max_price.replace(/[^0-9\.]+/g,"")
            ,_max_price = _max_price.match(/\d+(\.\d+)?/g,"");
      
        if( _min_price.length <= 0 || _max_price <= 0 ){
          return;
        }else{
           _min_price = Number(_min_price[0]);
           _max_price = Number(_max_price[0]);
        }
      
        $('#range-slider').slider({
            range: true,
            min: _min_price,
            max: _max_price,
            values: [_min_price, _max_price],
            create: function() {
              //Currency.convertAll('USD', Currency.currentCurrency); 
              // $("#amount").html('<span class="min-val"><span class="money">$10.00</span></span> - <span class="max-val"><span class="money">30000.00</span></span>');
            },
            slide: function (event, ui) {
              $("#amount").html('<span class="min-val">' + Shopify.formatMoney(ui.values[0]*100,_bc_config.money_format) + '</span> - <span class="max-val">' + Shopify.formatMoney(ui.values[1]*100,_bc_config.money_format) + '</span>');
              Currency.convertAll('USD' , Currency.currentCurrency);
              var mi = ui.values[0];
              var mx = ui.values[1];
              filterSystem(mi, mx);
            }
        })


        function filterSystem(minPrice, maxPrice) {
          $(".cata-product .product-price-range").hide().filter(function () {
            var price = parseInt($(this).data("price"), 10);
            return price >= minPrice && price <= maxPrice;
          }).show();
        }

    }
	
	,fixTitle : function(){ // fix title a in filter
		jQuery(".rt a").attr("data-title", function() { return jQuery(this).attr("title"); });
		jQuery(".rt a").removeAttr("title");
	}

	,filterCatalogReplace : function(){
		var value = collectionUrl.substring(collectionUrl.lastIndexOf('/') + 1);
		var val = value.substring(value.lastIndexOf('?')); 

		collectionUrl = collectionUrl.replace(value, '');

		value = value.replace(val, '');
		value = value.replace('#', '');

		var value_arr = value.split('+');

		var current_arr = [];
		jQuery('#'+filter_id+' li.active-filter').each( function() {
		  current_arr.push(jQuery(this).attr('data-handle'));
		});

		jQuery('#'+filter_id+' li.active-filter').find('a').attr('title', '');
		jQuery('#'+filter_id+' li').removeClass('active-filter');

		for(jQueryi = 0; jQueryi<current_arr.length; jQueryi++) {
		  value_arr = jQuery.grep(value_arr, function( n, i ) { return ( n !== current_arr[jQueryi]  ); });
		}

		var new_data = value_arr.join('+')

		var new_url = collectionUrl+new_data+val;

		window.location = new_url;
	}
  
	,filterCatalog : function(){
		var currentTags = ''
			,filters 	= jQuery('.advanced-filter');

		filters.each(function() {
			var el = jQuery(this)
				,group = el.data('group');

			if ( el.hasClass('active-filter') ) { //Remove class hidden
				el.parents('.sb-filter').find('a.clear-filter').removeClass('hidden');
			}
		});

		filters.on('click', function() {
			var el 		= jQuery(this)
				,group 	= el.data('group')
				,url 	= el.find('a').attr('href');

			// Continue as normal if we're clicking on the active link
			if ( el.hasClass('active-filter') ) {
				return;
			}
		});

		jQuery('.sb-filter').on('click', '.clear-filter', function(n){ // Handle button clear

			var filter_id = jQuery(this).attr('id');
			filter_id = filter_id.replace('clear-', '');

			var collectionUrl = window.location.href;

			if(collectionUrl.match(/\?/)){
				var string = collectionUrl.substring(collectionUrl.lastIndexOf('?') - 1);

				if(string.match(/\//)){
					var str_replace = string.replace(/\//, '');
					collectionUrl = collectionUrl.replace(string, '');
					collectionUrl = collectionUrl+str_replace;
					AT_Main.filterCatalogReplace();
				}
				else{
					AT_Main.filterCatalogReplace();
				}
			}
			else{
				var value = collectionUrl.substring(collectionUrl.lastIndexOf('/') + 1);

				collectionUrl = collectionUrl.replace(value, '');  

				value = value.replace('#', '');

				var value_arr = value.split('+');

				var current_arr = [];
				jQuery('#'+filter_id+' li.active-filter').each( function() {
				  current_arr.push(jQuery(this).attr('data-handle'));
				});

				jQuery('#'+filter_id+' li.active-filter').find('a').attr('title', '');
				jQuery('#'+filter_id+' li').removeClass('active-filter');

				for(jQueryi = 0; jQueryi<current_arr.length; jQueryi++) {
				  value_arr = jQuery.grep(value_arr, function( n, i ) { return ( n !== current_arr[jQueryi]  ); });
				}

				var new_data = value_arr.join('+')

				var new_url = collectionUrl+new_data;

				window.location = new_url;
			}

		});
	}
	
	,swatch : function(){
        jQuery('.swatch :radio').change(function() {
          	var optionIndex = jQuery(this).closest('.swatch').attr('data-option-index');
          	var optionValue = jQuery(this).val();
          	jQuery(this)
          	.closest('form')
          	.find('.single-option-selector')
          	.eq(optionIndex)
          	.val(optionValue)
          	.trigger('change');
        });
  	}

	,refreshImage : function(){ // Update product image in detail page
		if(jQuery('#gallery-image').length){

			jQuery('#product-image').on('click', '.thumb-img', function() {

				var _$this = jQuery(this);

				if(!_$this.hasClass('active')){
					var parent = _$this.parents('.product-image-inner');
					var src_original = _$this.attr('data-zoom-image');
					var src_display = _$this.attr('data-image');

					parent.find('.thumb-img').removeClass('active');
					_$this.addClass('active');

					parent.find('.featured-image').find('img').attr('data-zoom-image', src_original);
                 	parent.find('.featured-image').find('img').attr('src', src_display);
				}

				return false;
			});
		}
	}

	,refreshZoom : function(){ // Update Zoom in detail page
		var enable_zoom = jQuery('.featured-image').data('zoom');
		if((jQuery('.elevatezoom').length)){

			var zoomImage = jQuery('.elevatezoom .zoom-image');

			zoomImage.elevateZoom({
				gallery				:'gallery-image' 
				,galleryActiveClass	: 'active'
                ,zoomType			: 'lens'
                ,cursor				: 'pointer'
                ,lensShape 			: "round"
                ,lensSize 			: 200
			});

			//pass the images to Fancybox
			jQuery(".elevatezoom").bind("click", function(e) {  
				var ez =   jQuery('.elevatezoom .zoom-image').data('elevateZoom'); 
				jQuery.fancybox(ez.getGalleryList(),{
					closeBtn  : false,
					helpers : {
						buttons : {}
					}
				});
				return false;
			});
		}

	}
  
  	,scareName : function(){
        var _name_height = 0;
        jQuery('.product-wrapper').find('h5.product-name').each(function( index,value ){
          _name_height = jQuery(value).height() > _name_height ? jQuery(value).height() : _name_height;
        });
        jQuery('.product-wrapper').find('h5.product-name').css('height',_name_height);
    }          
    ,scareScreen : function(){
      	if( typeof _bc_config == "undefined" ){
          	return;
      	}
      	var _current = this;
      
      	if( _bc_config.enable_title_blance == "true" ){
          	this.scareName();
      	}      
      	
      	jQuery( document ).ajaxComplete(function( event,request, settings ) {
          if( _bc_config.enable_title_blance == "true" ){
              _current.scareName();
          }  
        });  
    }

	,cartJS_handle : function() {
		//Bind cart json data to HTML
		rivets.bind(jQuery('.templateCart #cartform, .cart-right, .page-cart .cart-empty-wrapper, #cart-content'), {cart: CartJS.cart});
		//It's need to calculate from default currency to current currency that has chosen before 

          if( _bc_config.show_multiple_currencies == 'true' ){
            setTimeout(function(){
            	Currency.convertAll('USD' , Currency.currentCurrency); 
            },50);                        
          }

		//Handle when update to cart json completed
		jQuery(document).on('cart.requestComplete', function(event, cart) {
			Shopify.onCartUpdate(CartJS.cart);
            if( _bc_config.show_multiple_currencies == 'true' ){  
				Currency.convertAll('USD' , Currency.currentCurrency); 
            }                        
		});
	}

	,init : function(){
      
      	if( typeof _bc_config == 'undefined' ){
           	 console.log( " _bc_config is undefined " );
           	 return ;
        }
      
        this.stickMenu();
		this.toTopButton();
		this.mailchipPopup();
      	this.toggleCartSidebar();
      	this.handleGridList();
      	this.effectNavigation();
        this.fixButton();
		this.menuOnMobile();
		this.handleMenuMultiLine();
		this.fixTitle();
		this.filterCatalog();
        this.swatch();
		this.refreshImage();
		this.refreshZoom();
		this.cartJS_handle();
	}
}


/* Handle when window resize */
jQuery(window).resize(function() {
	
	/* reset menu with condition */
	if(AT_Main.getWidthBrowser() < 1024){
		if(jQuery('#top').hasClass('on')){
			jQuery('#top').prev().remove();
			jQuery('#top').removeClass('on').removeClass('animated');
		}
	}
    
    /* Fakecrop */
    if(AT_Main.checkLayout() != 1){
        AT_Main.scareScreen();
    }

	/*Reset Page when fixNoScroll had called before*/
	AT_Main.fixReturnScroll();
	if(AT_Main.checkLayout() != 1 && jQuery('.menu-mobile').hasClass('opened'))
		jQuery("#page-body").trigger('click');
          
});
      
jQuery(document).ready(function($) {
	
	AT_Main.init();
  
  	/* Fakecrop */
    if(AT_Main.checkLayout() != 1){
        AT_Main.scareScreen();
    }
      
});

