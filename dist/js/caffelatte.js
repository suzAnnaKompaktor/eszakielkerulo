/**
 * @file
 */
window.theme = {};


/**
 * @file
 * Navbar.
 */

/*
(function($) {

  'use strict';

  $('.navbar-nav .dropdown').hover(function(){
    $('[data-toggle="dropdown"]', this).trigger('click');
  });

})(jQuery);
*/


/**
 * @file
 * Scroll.
 */

(function($) {

  'use strict';

  $(window).on('scroll', function(){
    if ($('body').scrollTop() > 0) {
      $('body').addClass('scrolled');
    }
    else {
      $('body').removeClass('scrolled');
    }
  });

})(jQuery);
