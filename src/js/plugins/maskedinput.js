/**
 * @file
 * Masked Input Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__maskedInput';

  var MaskedInput = function($element, options) {
    return this.init($element, options);
  };

  MaskedInput.DEFAULTS = {};

  MaskedInput.prototype = {
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
      this.defaults = MaskedInput.DEFAULTS;
      return this;
    },

    setOptions: function(options) {
      this.options = $.extend(true, {}, this.defaults, options);
      return this;
    },

    build: function() {
      this.$element.mask(this.$element.data('input-mask'), this.options);
      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    MaskedInput: MaskedInput
  });

  // Jquery plugin.
  $.fn.clMaskedInput = function(options) {
    return this.map(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new MaskedInput($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);
