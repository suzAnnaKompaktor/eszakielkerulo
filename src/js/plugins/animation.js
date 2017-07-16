/**
 * @file
 * Animation Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__animation';

  var Animation = function($element, options) {
    return this.init($element, options);
  };

  Animation.DEFAULTS = {
    delay: 500,
    infinite: false
  };

  Animation.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setDefaults: function () {
      this.defaults = Animation.DEFAULTS;
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
      var _self = this,
      $element = this.options.wrapper;

      $element.addClass('appear-animation');

      if (!$('html').hasClass('no-csstransitions')) {

        $element.on('appear', $element, function() {
          var delay = _self.options.delay;
          var infinite = _self.options.infinite;

          $element.addClass($element.attr('data-appear-animation')).addClass('animated');

          if (delay > 1) {
            $element.css('animation-delay', delay + 'ms');
          }

          setTimeout(function() {
            $element.addClass('appear-animation-visible');
          }, delay);

          if (infinite) {
            $element.addClass('infinite');
          }

        });

      }
      else {
        $element.addClass('appear-animation-visible');
      }

      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    Animation: Animation
  });

  // Jquery plugin.
  $.fn.clAnimation = function(options) {
    return this.map(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Animation($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);
