/**
 * @file
 * Panel.
 */

(function(theme, $) {

  theme = theme || {};

  var Panel = function($element, options) {
    return this.init($element, options);
  };

  Panel.DEFAULTS = {
    closeSelector: '> .panel-heading .panel-actions-close',
    toggleCollapseSelector: '> .panel-heading .panel-actions-collapse',
    iconSelector: '> i',
    iconCollapsed: 'icon-caret-right',
    iconExpanded: 'icon-caret-down'
  };

  Panel.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setOptions();
      this.$close = this.$element.find(this.options.closeSelector);
      this.$toggleCollapse = this.$element.find(this.options.toggleCollapseSelector);
      this.build();
      this.events();

      return this;
    },

    setOptions: function(options) {
      this.options = $.extend(true, {}, Panel.DEFAULTS, options);

      return this;
    },

    build: function() {
      if (this.$element.hasClass('collapsed')) {
        this.$toggleCollapse.find(this.options.iconSelector).removeClass(this.options.iconExpanded).addClass(this.options.iconCollapsed);
      }

      return this;
    },

    events: function() {
      var _self = this;

      if (this.$toggleCollapse !== undefined) {
        this.$toggleCollapse.on('click', function(event) {
          event.preventDefault();
          _self.toggleCollapse($(this));
        });
      }

      if (this.$close !== undefined) {
        this.$close.on('click', function(event) {
          event.preventDefault();
          _self.close();
        });
      }
    },

    toggleCollapse: function (target) {
      var $target = $(target);
      this.$element.find('> .panel-body, > .panel-footer').slideToggle();
      this.$element.toggleClass('collapsed');
      if (this.$element.hasClass('collapsed')) {
        $target.find(this.options.iconSelector).removeClass(this.options.iconExpanded).addClass(this.options.iconCollapsed);
      }
      else {
        $target.find(this.options.iconSelector).removeClass(this.options.iconCollapsed).addClass(this.options.iconExpanded);
      }
    },

    close: function () {
      this.$element.hide();
    }
  };

  // Expose to scope.
  $.extend(theme, {
    Panel: Panel
  });

  // Jquery plugin.
  $.fn.clPanel = function(options) {
    return this.map(function() {
      var $this = $(this);
      new Panel($this, options);
    });
  };

}).apply(this, [ window.theme, jQuery ]);
