/**
 * @file
 * Lightbox plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__lightbox';

  var Lightbox = function($element, options) {
    return this.init($element, options);
  };

  Lightbox.DEFAULTS = {
    tClose: 'Close (Esc)',
    // Alt text on close button.
    tLoading: 'Loading...',
    // Text that is displayed during loading. Can contain %curr% and %total% keys.
    gallery: {
      tPrev: 'Previous (Left arrow key)',
      // Alt text on left arrow.
      tNext: 'Next (Right arrow key)',
      // Alt text on right arrow.
      tCounter: '%curr% of %total%'
      // Markup for "1 of 7" counter.
    },
    image: {
      tError: '<a href="%url%">The image</a> could not be loaded.'
      // Error message when image could not be loaded.
    },
    ajax: {
      tError: '<a href="%url%">The content</a> could not be loaded.'
      // Error message when ajax request failed.
    }
  };

  Lightbox.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setData: function() {
      this.$element.data(pluginName, this);
      return this;
    },

    setDefaults: function () {
      this.defaults = Lightbox.DEFAULTS;
      return this;
    },

    setOptions: function(options) {
      this.options = $.extend(true, {}, this.defaults, options, {
        wrapper: this.$element
      });

      return this;
    },

    build: function() {
      this.options.wrapper.magnificPopup(this.options);
      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    Lightbox: Lightbox
  });

  // Jquery plugin.
  $.fn.clLightbox = function(options) {
    return this.each(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Lightbox($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);
