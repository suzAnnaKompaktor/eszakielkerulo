/**
 * @file
 * Select2 Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__select2';

  var Select2 = function($element, options) {
    return this.init($element, options);
  };

  Select2.DEFAULTS = {
    theme: "caffelatte"
  };

  Select2.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setClasses();
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setDefaults: function () {
      this.defaults = Select2.DEFAULTS;
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

    setClasses: function() {
      this.classes = this.$element.attr('class').split(" ");
    },

    build: function() {
      var select2 = this.$element.select2(this.options);
      select2.data('select2').$container.addClass(this.classes.join(' '));
      if (this.classes.indexOf('select-inverse') >= 0) {
        select2.data('select2').$dropdown.addClass('select-inverse');
      }
      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    Select2: Select2
  });

  // Jquery plugin.
  $.fn.clSelect2 = function(options) {
    return this.map(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Select2($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);
