/**
 * @file
 * ScrollToTop Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__scrolltotop';

  var PluginScrollToTop = function($element, options) {
    return this.init($element, options);
  };

  PluginScrollToTop.DEFAULTS = {
    offset: 150,
    delay: 800,
    visibleMobile: false,
    label: false
  };

  PluginScrollToTop.prototype = {
    init: function($element, options) {
      this.$element = $element;

      this
        .setOptions(options)
        .build()
        .events();

      return this;
    },

    setOptions: function(options) {
      this.options = $.extend(true, {}, PluginScrollToTop.DEFAULTS, options);

      return this;
    },

    build: function() {
      var self = this;

      // Visible Mobile.
      if (!self.options.visibleMobile) {
        this.$element.addClass('hidden-xs');
      }

      return this;
    },

    events: function() {
      var self = this,
          _isScrolling = false;

      // Click Element Action.
      self.$element.on('click', function(e) {
        e.preventDefault();
        $('body, html').animate({
          scrollTop: 0
        }, self.options.delay);
        return false;
      });

      // Show/Hide Button on Window Scroll event.
      $(window).scroll(function() {
        if (!_isScrolling) {
          _isScrolling = true;
          if ($(window).scrollTop() > self.options.offset) {
            self.$element.stop(true, true).addClass('show');
            _isScrolling = false;
          }
          else {
            self.$element.stop(true, true).removeClass('show');
            _isScrolling = false;
          }
        }
      });

      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    PluginScrollToTop: PluginScrollToTop
  });

  // Jquery plugin.
  $.fn.clPluginScrollToTop = function(options) {
    return this.map(function() {
      if (!$.data(this, pluginName)) {
        $.data(this, pluginName,
          new PluginScrollToTop($(this), options));
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);
