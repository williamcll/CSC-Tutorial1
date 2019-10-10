var AT_Slider ={
  
    owlSlider : function(){
      
      	jQuery(".service-list-item").length && jQuery('.service-list-item').owlCarousel({
          	nav			: true
          	,dots 		: false
      		,items		: 4
          	,margin		: 0
			,responsive : {
              	0:{
                	items: 1
                }
            	,768:{
              		items: 2
            	}
              	,980:{
              		items: 3
            	}
              	,1024:{
              		items: 4,
                    nav	: false
            	}
          	}
          	,navText	: ['<span class="button-prev"></span>', '<span class="button-next"></span>']
        });
      
      	jQuery("#widget-partner").length && jQuery('#widget-partner').owlCarousel({
          	nav			: true
          	,dots 		: false
      		,items		: 5
          	,margin		: 30
			,responsive : {
              	0:{
                	items: 1
                }
            	,480:{
              		items: 2
            	}
            	,991:{
              		items: 3
            	}
              	,1024:{
              		items: 4
            	}
              	,1200:{
              		items: 5
            	}
          	}
          	,navText	: ['<span class="button-prev"></span>', '<span class="button-next"></span>']
        });

        jQuery("#gallery-image").length && jQuery('#gallery-image').owlCarousel({
            nav			: true
          	,dots 		: false
          	,margin		: 20
          	,mouseDrag	: false
			,responsive : {
                0:{
                	items: 2
                }
              	,480:{
                	items: 3
                }
          	}
			,navText	: ['<span class="button-prev"></span>', '<span class="button-next"></span>']
			
        });

	}
  
  	,init : function(){
      this.owlSlider();
    }
  
}

/* Check IE */
var bcMsieVersion = {

  MsieVersion: function() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
    else                 // If another browser, return 0
      {
      return 0;
    }
  }

  ,init : function(){
    this.MsieVersion();
  }
}

jQuery(document).ready(function($) {
	
	AT_Slider.init();
      
});