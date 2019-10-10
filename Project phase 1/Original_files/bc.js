Shopify.Wishlist = (function() {

	var config = { 
		howManyToShow				: 4,
		howManyToStoreInMemory		: 4, 
		storeSelector				: 'add-product-wishlist', 
		removeSelector				: 'remove-product-wishlist', 
		showwishlist				: 'show-wishlist', 
		wrapperId					: 'product-wishlist', 
		templateId					: 'product-wishlist-template-wrapper',
		onComplete					: null
	};
	
	var productHandleQueue = [];
	var wrapper = null;
	var template = null;
	var shown = 0;
    var feature_template = "";

	var cookie = {
		configuration: {
			expires: 90,
			path: '/',
			domain: window.location.hostname
		},
		name: 'shopify_product_wishlist',
		
		write: function(productwishlist) {
			jQuery.cookie(this.name, productwishlist.join(' '), this.configuration);
		},
		
		read: function() {
			var productwishlist = [];
			var cookieValue = jQuery.cookie(this.name);
			if ( typeof cookieValue != 'undefined' && cookieValue !== null && cookieValue.length > 0 ) {
			 	productwishlist = cookieValue.split(' ');
			}
			return productwishlist;		
		},
		
		destroy: function() {
			jQuery.cookie(this.name, null, this.configuration);
		},
		
		remove: function(productHandle) {
			var productwishlist = this.read();
			var position = jQuery.inArray(productHandle, productwishlist);
			if (position !== -1) {
				productwishlist.splice(position, 1);
				this.write(productwishlist);
			}		
		}
	};
	
	var finalize = function() {

		jQuery('.loading').hide();
		jQuery.fancybox(
			jQuery('#' + config.wrapperId),{
				'autoDimensions': false
              	,'height': 690
              	,'width': 1170
				,'autoSize'   : false
				,'transitionIn' : 'fade'
				,'transitionOut': 'fade'
              	,'afterShow': function(){
                  	$('#product-wishlist').removeClass();
                  	switch(shown) {
                      case 1:
                        $('#product-wishlist').addClass('one-prods');
                        break;
                      case 2:
                        $('#product-wishlist').addClass('two-prods');
                        break;
                      case 3:
                        $('#product-wishlist').addClass('three-prods');
                        break;
                      case 4:
                        $('#product-wishlist').addClass('four-prods');
                        break;
                    }
                  	shown = 0;
		          	
					Currency.convertAll('USD' , Currency.currentCurrency); 
		                
                  	
                }
			}
		);

	
		// If we have a callback.
		if (config.onComplete) {
			try { config.onComplete() } catch (error) { }
		}	
	};
	
	var buildwishlistObject = function( _product, _template ){
		if( typeof _product == "undefined" ){
			return;
		}

		
		var _return_template = {
			 	"features" 			: _template.features
			 	,"availability" 	: _template.availability
			 	,"options" 			: _template.options
			 	,"vendor" 			: _template.vendor
			 	,"collection" 		: _template.collection 
			 	,"rating" 			: _template.rating 
		};
		
		_template.features = _template.features.replace(/___product_id___/gi, _product.id);
		_template.features = _template.features.replace(/___product_url___/gi, _product.uri);
		_template.features = _template.features.replace(/___product_handle___/gi, _product.handle);
		_template.features = _template.features.replace("att-image-src=", "src=");
		_template.features = _template.features.replace(/___product_image___/gi, _product.featured_image);
		_template.features = _template.features.replace(/___product_title___/gi, _product.title);
		_template.features = _template.features.replace(/___product_availability___/gi, _product.available);
		_template.features = _template.features.replace(/___product_price___/gi, _product.price);

		_template.features = _template.features.replace(/___product_label_sale___/gi, _product.sale_label);
		_template.features = _template.features.replace(/___product_label_new___/gi, _product.new_label);

		if( _product.has_wishlist_price ){
			_template.features = _template.features.replace(/price price-wishlist product-old-price hidden/gi, "price price-wishlist product-old-price");
		}
		_template.features = _template.features.replace(/___product_old_price___/gi, _product.wishlist_price);

		_template.features = _template.features.replace(/___product_variant_id___/gi, _product.variants[0].id);


		_template.availability = _template.availability.replace(/___product_id___/gi, _product.id);
		_template.availability = _template.availability.replace(/___product_availability___/gi, _product.available);

		_template.vendor = _template.vendor.replace(/___product_id___/gi, _product.id);
		_template.vendor = _template.vendor.replace(/___product_vendor___/gi, _product.vendor);

		_template.rating = _template.rating.replace(/___product_id___/gi, _product.id);

		var _rating = '<span class="spr-starrating spr-summary-starrating" itemtype="http://data-vocabulary.org/Rating" itemscope="" itemprop="rating"><meta content="0.0" itemprop="average"><meta content="5" itemprop="best"><meta content="1" itemprop="worst"><i style="" class="spr-icon spr-icon-star-empty"></i><i style="" class="spr-icon spr-icon-star-empty"></i><i style="" class="spr-icon spr-icon-star-empty"></i><i style="" class="spr-icon spr-icon-star-empty"></i><i style="" class="spr-icon spr-icon-star-empty"></i></span>';
		if( _product.rating.length > 0 ){
			_rating = jQuery('<div>'+_product.rating+'</div>');
			_rating = '<span class="spr-starrating spr-summary-starrating" itemtype="http://data-vocabulary.org/Rating" itemscope="" itemprop="rating">' + _rating.find('span.spr-starrating').html() + '</span>';

		}

		_template.rating = _template.rating.replace(/___product_rating___/gi, _rating );	

		_template.collection = _template.collection.replace(/___product_id___/gi, _product.id);
		_template.collection = _template.collection.replace(/___product_collection___/gi, _product.collections);


		_template.options = _template.options.replace(/___product_id___/gi, _product.id);
		if( _product.options.length == 1 && _product.options[0] == "Title" && _product.option_value.option1.length == 1 && _product.option_value.option1[0] == "Default Title" ){
			 _template.options = _template.options.replace(/___product_options___/gi, "");
		}else{
		  var _option_htmls = ""
		  for( var _counter = 0 ; _counter < _product.options.length ; _counter++ ){
			switch(_counter) {
			  case 0:
				_option_htmls = _option_htmls + '<span class="line"><label class="heading">' + _product.options[_counter] + '</label>' +_product.option_value.option1.join(",") + "</span>";
				break;
			  case 1:
				_option_htmls = _option_htmls + '<span class="line"><label class="heading">' + _product.options[_counter] + '</label>' +_product.option_value.option2.join(",") + "</span>";
				break;
			  case 2:
				_option_htmls = _option_htmls + '<span class="line"><label class="heading">' + _product.options[_counter] + '</label>' +_product.option_value.option3.join(",") + "</span>";
				break;			
			} 
		  }
		   _template.options = _template.options.replace(/___product_options___/gi, _option_htmls);
		}
		 

		return {
			"before" 	: _return_template
			,"after"	: _template
		};
	}	
	
	var moveAlong = function( table_template, template, wrapper ) {
      	

		if (productHandleQueue.length && ( shown < config.howManyToShow ) ) {

			jQuery.ajax({
				//dataType: 'json',
				url: '/products/' + productHandleQueue[0] ,
				data: {"view":"wishlist"},
				cache: true,
				success: function( respond ) {
					var _product = jQuery.parseJSON(respond);
					var _current_template = buildwishlistObject( _product,table_template );
					table_template = _current_template.before;
					_current_template	= _current_template.after;
					

					template.find('tr.features').append(_current_template.features);
					template.find('tr.availability').append(_current_template.availability);
					template.find('tr.vendor').append(_current_template.vendor);
					template.find('tr.collection').append(_current_template.collection);
					template.find('tr.options').append(_current_template.options);
					template.find('tr.rating').append(_current_template.rating);


					wrapper.html(template.html());					
					
					productHandleQueue.shift();
					shown++;
					moveAlong( table_template, template, wrapper );
				},
				error: function() {
					cookie.remove(productHandleQueue[0]);
					productHandleQueue.shift();
					moveAlong( table_template, template, wrapper );
				}
			});
		}
		else {
			finalize();
            template.find('td.product-col.wishlist_features').html(feature_template)
		}
	
	};
	
	return {
	 
		resizeImage: function(src, size) {
			if (size == null) {
			 return src;
			}

			if (size == 'master') {
			 return src.replace(/http(s)?:/, "");
			}

			var match	= src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?/i);

			if (match != null) {
			 var prefix = src.split(match[0]);
			 var suffix = match[0];

			 return (prefix[0] + "_" + size + suffix).replace(/http(s)?:/, "")
			} else {
			 return null;
			}
		},

		showProductwishlist: function(params) {

			var params = params || {};

			// Update defaults.
			jQuery.extend(config, params);

			// Read cookie.
			productHandleQueue = cookie.read();

			jQuery('.loading').show();	

			if( productHandleQueue.length < 1 ){
				jQuery.fancybox(
					jQuery('<p class="bc-error"><span>You have to add at least one product</span></p>'),{
						'autoDimensions': false
						,'autoSize'   : false
						,'width' : 350
						,'height' : 150
						,'afterShow' : function(){
							setTimeout(function(){ jQuery.fancybox.close(); }, 30000);	
						}
					}
				);
				jQuery('.loading').hide();
				return -1;
			}
			

			// Template and element where to insert.
			template = jQuery('#' + config.templateId);
			wrapper = jQuery('#' + config.wrapperId);
			
			var features_html 			 	= template.find('td.product-col.wishlist_features').html()
			,features_col 			 		= '<td class="product-col wishlist_features product-___product_id___">' + features_html + '</td>'
			,availability_col 	 			= '<td class="product-col wishlist_availability product-___product_id___">___product_availability___</td>'
			,options_col 			   		= '<td class="product-col wishlist_options product-___product_id___">___product_options___</td>'
			,vendor_col 			  		= '<td class="product-col wishlist_vendor product-___product_id___">___product_vendor___<span class="shopify-product-reviews-badge" data-id="___product_id___"></span></td>'
			,collection_col 		 		= '<td class="product-col wishlist_collection product-___product_id___">___product_collection___</td>'
			,rating_col 		 			= '<td class="product-col wishlist_rating product-___product_id___">___product_rating___</td>'
			,table_template					= { "features" : features_col, "availability" : availability_col, "options" : options_col, "vendor" : vendor_col, "collection" : collection_col, "rating" : rating_col } ; 
			template.find('td.product-col').remove() ;			
			
            if( feature_template.length == 0 ){
              	feature_template = features_html;
            }
  			
			// How many products to show.
			//config.howManyToShow = Math.min(productHandleQueue.length, config.howManyToShow);

			// If we have any to show.
			if (config.howManyToShow && template.length && wrapper.length) {
			 // Getting each product with an Ajax call and rendering it on the page.
              	
				moveAlong( table_template, template, wrapper );	 
			}

		},

		getConfig: function() {
			return config;
		},

		clearList: function() {
			cookie.destroy();	 
		},
		
		
		removeProductwishlist: function( params ) {
			var params = params || {};

			// Update defaults.
			jQuery.extend(config, params);

			// Read cookie.
			var productwishlist = cookie.read();

			jQuery('.loading').show();	

			// If we are on a product page.
			if (  params.handle.length > 0 ) {

				// What is the product handle on this page.
				//var productHandle = window.location.pathname.match(/\/products\/([a-z0-9\-]+)/)[1];
				
				var productHandle = params.handle;
				
				// In what position is that product in memory.
				var position = jQuery.inArray(productHandle, productwishlist);
				// If not in memory.
				if (position !== -1) {
					// Remove the product and place it at start of list.
					productwishlist.splice(position, 1);		 
				}

			 // Update cookie.
				cookie.write(productwishlist);

			}

			jQuery('.wishlist-icon').children('span.number').text(productwishlist.length);
			jQuery('.loading').hide();
		},
	
		recordProductwishlist: function( params ) {

			var params = params || {};

			// Update defaults.
			jQuery.extend(config, params);
			jQuery('.loading').show();	


			// Read cookie.
			var productwishlist = cookie.read();

			// If we are on a product page.
			if ( params.handle.length > 0 ) {

				// What is the product handle on this page.
				//var productHandle = window.location.pathname.match(/\/products\/([a-z0-9\-]+)/)[1];
				
				var productHandle = params.handle;
				
				// In what position is that product in memory.
				var position = jQuery.inArray(productHandle, productwishlist);
				// If not in memory.
				if (position === -1) {
					if( productwishlist.length < config.howManyToStoreInMemory ){
						// Add product at the end of the list.
						productwishlist.push(productHandle);
						// Only keep what we need.
						productwishlist = productwishlist.splice(0, config.howManyToStoreInMemory);
                      
                     // Update cookie.
                        cookie.write(productwishlist);
                        jQuery.fancybox(
                                jQuery('<p class="bc-success"><span>Product added to wishlist list</span></p>'),{
                                    'autoDimensions': false
                                    ,'autoSize'   : false
                                    ,'width' : 350
                                    ,'height' : 60
                                    ,'afterShow' : function(){
                                        setTimeout(function(){ jQuery.fancybox.close(); }, 30000);

                                    }
                                }
                        );
                        jQuery('.wishlist-icon').children('span.number').text(productwishlist.length);
                        jQuery('.loading').hide();     
              			return;
                      
					}else{
						// add to much
						jQuery.fancybox(
							jQuery('<p class="bc-error"><span>Your wishlist list is full</span></p>'),{
								'autoDimensions': false
								,'autoSize'   : false
								,'width' : 350
								,'height' : 60
								,'afterShow' : function(){
									setTimeout(function(){ jQuery.fancybox.close(); }, 30000);
									
								}
							}
						);
						jQuery('.loading').hide();
						return;							
					}

				}else {
					// Remove the product and place it at start of list.
					jQuery.fancybox(
						jQuery('<p class="bc-error"><span>Product already on wishlist list</span></p>'),{
							'autoDimensions': false
							,'autoSize'   : false
							,'width' : 350
							,'height' : 60
							,'afterShow' : function(){
								setTimeout(function(){ jQuery.fancybox.close(); }, 30000);
								
							}
						}
					);
					jQuery('.loading').hide();
					return;		 
				}

			}

			
		},



		initWishlist : function( params ){
			
			var _product_wishlist = this;
			var _storedProductwishlist = cookie.read();
			jQuery('.wishlist-icon').children('span.number').text(_storedProductwishlist.length);
			var params = params || {};
			jQuery.extend(config, params);
			jQuery( "a."+config.storeSelector ).bind( "click", function() {
				var _handle = jQuery(this).attr('data-handle-product');
				_product_wishlist.recordProductwishlist({"handle":_handle});
			});

			
			var _removeSelector = "a."+ config.removeSelector;
			jQuery( "body" ).delegate( _removeSelector,"click", function( event ) {
              	event.preventDefault();
				var _handle = jQuery(this).attr('data-handle-product')
					,_id 	= 	jQuery(this).attr('data-id-product');
				jQuery('#' + config.wrapperId).find('td.product-col.product-'+_id).remove();
				_product_wishlist.removeProductwishlist({"handle":_handle});
			});


			jQuery( "a."+config.showwishlist ).bind( "click", function() {
				_product_wishlist.showProductwishlist();

			});			
		}		

	};

})();
