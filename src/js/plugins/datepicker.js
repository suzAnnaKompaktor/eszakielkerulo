/**
 * @file
 * Datepicker Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__datepicker';

  var Datepicker = function($element, options) {
    return this.init($element, options);
  };

  Datepicker.DEFAULTS = {};

  Datepicker.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setDefaults: function () {
      this.defaults = Datepicker.DEFAULTS;
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
      this.$element.datepicker(this.options);
      if (typeof this.options.skin !== undefined) {
        var skin = this.options.skin;
        var datepicker = this.$element.data('datepicker');
        if (datepicker.picker) {
          datepicker.picker.addClass('datepicker-' + skin);
        }
        else {
          $.each(datepicker.pickers, function(i, obj){
            obj.picker.addClass('datepicker-' + skin);
          });
        }
      }

      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    Datepicker: Datepicker
  });

  // Jquery plugin.
  $.fn.clDatepicker = function(options) {
    return this.map(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Datepicker($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);
