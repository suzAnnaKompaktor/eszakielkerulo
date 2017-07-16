/**
 * @file
 * Timepicker Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__timepicker';

  var Timepicker = function($element, options) {
    return this.init($element, options);
  };

  Timepicker.DEFAULTS = {};

  Timepicker.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setDefaults: function () {
      this.defaults = Timepicker.DEFAULTS;
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
      this.$element.timepicker(this.options);
      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    Timepicker: Timepicker
  });

  // Jquery plugin.
  $.fn.clTimepicker = function(options) {
    return this.map(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Timepicker($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);
