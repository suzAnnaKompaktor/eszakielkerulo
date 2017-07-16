/**
 * @file
 * TextArea AutoSize.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__autosize';

  var AutoSize = function($element) {
    return this.init($element);
  };

  AutoSize.DEFAULTS = {};

  AutoSize.prototype = {
    init: function($element) {
      this.$element = $element;
      this.setData();
      this.build();

      return this;
    },

    setData: function() {
      this.$element.data(pluginName, this);
      return this;
    },

    build: function() {
      autosize(this.$element);
    }
  };

  // Expose to scope.
  $.extend(theme, {
    AutoSize: AutoSize
  });

  // Jquery plugin.
  $.fn.clAutoSize = function() {
    return this.each(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new AutoSize($this);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);
