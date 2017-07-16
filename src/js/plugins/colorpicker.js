/**
 * @file
 * Colorpicker Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__colorpicker';

  var Colorpicker = function($element, options) {
    return this.init($element, options);
  };

  Colorpicker.DEFAULTS = {};

  Colorpicker.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setDefaults: function () {
      this.defaults = Colorpicker.DEFAULTS;
      return this;
    },

    setData: function() {
      this.$element.data(pluginName, this);

      return this;
    },

    setOptions: function(options) {
      this.options = $.extend(true, {}, this.defaults, options);
      return this;
    },

    build: function() {
      this.$element.colorpicker(this.options);
      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    Colorpicker: Colorpicker
  });

  // Jquery plugin.
  $.fn.clColorpicker = function(options) {
    return this.map(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Colorpicker($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);
