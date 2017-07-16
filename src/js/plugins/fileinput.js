/**
 * @file
 * File input Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__fileinput';

  var FileInput = function($element, options) {
    return this.init($element, options);
  };

  FileInput.DEFAULTS = {
    browseIcon: '<i class="icon icon-fw icon-folder-open"></i>',
    removeIcon: '<i class="icon icon-fw icon-trash"></i>',
    cancelIcon: '<i class="icon icon-fw icon-ban"></i>',
    uploadIcon: '<i class="icon icon-fw icon-upload"></i>',
    msgValidationErrorIcon: '<i class="icon icon-fw icon-times-circle"></i> ',
    captionTemplate : '<div tabindex="-1" class="form-control file-caption {class}">\n' +
                '   <span class="icon icon-file-o text-muted kv-caption-icon"></span><div class="file-caption-name"></div>\n' +
                '</div>',
    progressClass: 'progress-bar progress-bar-info progress-bar-striped active',
    progressCompleteClass: 'progress-bar progress-bar-success',
    zoomIndicator: '<i class="icon icon-fw icon-search-plus"></i>',
    fileActionSettings: {
        removeIcon: '<i class="icon icon-fw icon-trash"></i>',
        uploadIcon: '<i class="icon icon-fw icon-upload"></i>',
        indicatorNew: '<i class="icon icon-fw icon-plus-circle text-warning"></i>',
        indicatorSuccess: '<i class="icon icon-fw icon-check text-success"></i>',
        indicatorError: '<i class="icon icon-fw icon-times-circle"></i>',
        indicatorLoading: '<i class="icon icon-fw icon-refresh text-muted"></i>',
     },
    layoutTemplates: {
      icon: '<span class="icon icon-fw icon-file-o kv-caption-icon"></span> '
     }
  };

  FileInput.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setDefaults: function () {
      this.defaults = FileInput.DEFAULTS;
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
      this.$element.fileinput(this.options);
      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    FileInput: FileInput
  });

  // Jquery plugin.
  $.fn.clFileInput = function(options) {
    return this.map(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new FileInput($this, options);
      }
      else {
        $this.data( pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);
