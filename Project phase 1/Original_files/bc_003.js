function addCart(){
  AT_Main.fixNoScroll();
  $('.cart-sb').toggleClass('opened');
  $('html,body').toggleClass('cart-opened');
}

function notifyAddCartFail($i){
  $('.loading').hide();
  $.jGrowl($i,{
    life: 3000,
    position:'center'
  });	
}

/* Ajax Add To Cart */

function addToCart(e){
  if (typeof e !== 'undefined') e.preventDefault();

  /* Show loading */
  $('.loading').show();

  var $this = $(this);

  $this.addClass('disabled');

  var form = $this.parents('form');

  // Hide Modal
  $('.modal').modal('hide');

  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    async: true,
    data: form.serialize(),
    dataType: 'json',
    error: addToCartFail,
    success: addToCartSuccess,
    cache: false
  });
  
}

function addToCartSuccess (jqXHR, textStatus, errorThrown){
  $('.add-to-cart').removeClass('disabled');

  $.ajax({
    type: 'GET',
    url: '/cart.js',
    async: false,
    cache: false,
    dataType: 'json',
    success: updateCartDesc
  });
  
  $('.loading').hide();
  
  
  $('#layer-addcart-modal').show();

  var price = jqXHR['price'];
  var qty = jqXHR['quantity'];
  var total = price * qty;
  var addcart_modal_image = '<img src="'+ Shopify.resizeImage(jqXHR['image'], 'medium') +'" alt="'+ jqXHR['title'] +'"/>';
  var addcart_modal_name = jqXHR['product_title'];
  var addcart_modal_variant = ""; if(jqXHR['variant_title'] != null) addcart_modal_variant = 'Variant: '+jqXHR['variant_title'];
  var addcart_modal_qty = '<strong>Qty:</strong>'+jqXHR['quantity'];
  var addcart_modal_price = '<strong>Total:</strong>'+Shopify.formatMoney(total, _bc_config.money_format);
  var addcart_modal_numpro = ""; if ($(".basket .number .n-item").html() == 1) addcart_modal_numpro = "There is 1 item in your cart."; else addcart_modal_numpro = "There are "+$(".basket .number .n-item").html()+" items in your cart.";
  
  //add data
  
  $('.addcart-modal-image').html(addcart_modal_image);
  $('.addcart-modal-title').html(addcart_modal_name);
  $('.addcart-modal-price').html(addcart_modal_price);
  $('.addcart-modal-variant').html(addcart_modal_variant); 
  $('.addcart-modal-qty').html(addcart_modal_qty);
  $('.addcart-modal-number').html(addcart_modal_numpro);
  $('.addcart-modal-box').show();
  
  

  // Get the cart show in the cart box.
  Shopify.getCart(function(cart) {
    Shopify.updateCartInfo(cart, '#cart-info #cart-content');		
  });
  
  
}

function addToCartFail(jqXHR, textStatus, errorThrown){
  var response = $.parseJSON(jqXHR.responseText);

  var $i = '<div class="error">'+ response.description +'</div>';
  notifyAddCartFail($i);
}

function addcartModalHide(){
  $("#layer-addcart-modal").addClass("zoomOut animated").fadeOut();
  $("#layer-addcart-modal").removeClass("zoomOut animated");
}

(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());

var g = {

      common : {
        init: function(){
          $("body").on( 'click','.add-to-cart', addToCart );
        }
      }
  
      ,templateIndex : {
        init: function(){}
      }

      ,templateProduct : {
        init: function(){}
      }

      ,templateCart : {
        init: function(){}
      }
	}  
    ,u = {
        fire: function(t, a, o) {
            var e = g;
            a = void 0 === a ? "init" : a, "" !== t && e[t] && "function" == typeof e[t][a] && e[t][a](o)
        }
        ,loadEvents: function() {
            var t = document.body.id;
            u.fire("common"), $.each(document.body.className.split(/\s+/), function(a, o) {
                u.fire(o), u.fire(o, t)
            })
        }
    };

$(document).ready(u.loadEvents);