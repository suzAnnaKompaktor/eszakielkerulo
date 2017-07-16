/**
 * @file
 * Colorpicker Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__carousel';

  var Carousel = function($element, options) {
    return this.init($element, options);
  };

  Carousel.DEFAULTS = {
  };

  Carousel.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setDefaults: function () {
      this.defaults = Carousel.DEFAULTS;
      return this;
    },

    setData: function() {
      this.$element.data(pluginName, this);
      return this;
    },

    setOptions: function(options) {
      this.options = $.extend(true, {}, this.defaults, options, {
        wrapper: this.$element
      });
      return this;
    },

    build: function() {
      this.options.wrapper.owlCarousel(this.options).addClass("owl-carousel-init");
      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    Carousel: Carousel
  });

  // Jquery plugin.
  $.fn.clCarousel = function(options) {
    return this.map(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Carousel($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);
