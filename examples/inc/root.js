(function($) {
  $('.navbar-nav a').each(function() {
    if (this.pathname === window.location.pathname) {
      $(this).parents('li').addClass('active');
    };
  });
})(jQuery);
