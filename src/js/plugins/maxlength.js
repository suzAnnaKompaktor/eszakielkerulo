/**
 * @file
 * MaxLength Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__maxlength';

  var MaxLength = function($element, options) {
    return this.init($element, options);
  };

  MaxLength.DEFAULTS = {
    alwaysShow: true,
    warningClass: "label label-info",
    limitReachedClass: "label label-danger",
    separator: ' of ',
    preText: 'used ',
    postText: ' chars',
    placement: 'bottom-right-inside',
    validate: true
  };

  MaxLength.prototype = {
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
      this.defaults = MaxLength.DEFAULTS;
      return this;
    },

    setOptions: function(options) {
      this.options = $.extend(true, {}, this.defaults, options);
      return this;
    },

    build: function() {
      this.$element.maxlength(this.options);
      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    MaxLength: MaxLength
  });

  // Jquery plugin.
  $.fn.clMaxLength = function(options) {
    return this.map(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new MaxLength($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);
