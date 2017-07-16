/**
 * @file
 * Slider Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__slider';

  var Slider = function($element, options) {
    return this.init($element, options);
  };

  Slider.DEFAULTS = {};

  Slider.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setOutput();
      this.setTooltip();
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setDefaults: function () {
      this.defaults = Slider.DEFAULTS;
      return this;
    },

    setData: function() {
      this.$element.data(pluginName, this);
      return this;
    },

    setOptions: function(options) {
      var _self = this;
      this.options = $.extend(true, {}, this.defaults, options);

      if (this.$output || this.$tooltip) {
        $.extend(this.options, {
          slide: function(event, ui) {
            _self.onSlide(event, ui);
          }
        });
      }

      return this;
    },

    setOutput: function() {
      var $output = $(this.$element.data('plugin-slider-output'));
      this.$output = $output.get(0) ? $output : null;

      return this;
    },

    setTooltip: function() {
      var $tooltip = null;
      if (this.$element.data('plugin-slider-tooltip')) {
        $tooltip = $('<div id="slider-tooltip" />').css({
          position: 'absolute',
          top: -25,
          left: -8,
          opacity: 1
        }).hide();
      }
      this.$tooltip = $tooltip;

      return this;
    },

    build: function() {
      this.$element.slider(this.options);
      if (this.$tooltip) {
        var tooltip = this.$tooltip;
        this.$element.find(".ui-slider-handle").append(tooltip).hover(function() {
            tooltip.show();
        }, function() {
            tooltip.hide();
        });
      }
      return this;
    },

    onSlide: function(event, ui) {
      if (!ui.values) {
        if (this.$output) {
          this.$output.val(ui.value);
        }
        if (this.$tooltip) {
          this.$tooltip.text(ui.value);
        }
      }
      else {
        if (this.$output) {
          this.$output.val(ui.values[ 0 ] + '/' + ui.values[ 1 ]);
        }
      }

      if (this.$output) {
        this.$output.trigger('change');
      }
    }
  };

  // Expose to scope.
  $.extend(theme, {
    Slider: Slider
  });

  // Jquery plugin.
  $.fn.clSlider = function(options) {
    return this.each(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Slider($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);
