/**
 * @file
 * Panel.
 */

(function(theme, $) {

  theme = theme || {};

  var CollapsibleFieldset = function($element, options) {
    return this.init($element, options);
  };

  CollapsibleFieldset.DEFAULTS = {
    legendSelector: '> legend .fieldset-legend',
    wrapperSelector: '> .fieldset-wrapper',
    linkSelector: '<a class="fieldset-title" href="#"></a>',
    iconSelector: '> legend i',
    iconCollapsed: 'icon-caret-right',
    iconExpanded: 'icon-caret-down'
  };

  CollapsibleFieldset.prototype = {
    init: function($element, options) {
      this.$fieldset = $element;
      this.setOptions();
      this.$wrapper = this.$fieldset.find(this.options.wrapperSelector);
      this.$legend = this.$fieldset.find(this.options.legendSelector);
      this.$link = $(this.options.linkSelector).prepend(this.$legend.contents())
      .appendTo(this.$legend);
      console.log($(this.options.linkSelector));
      //this.build();
      this.events();

      return this;
    },

    setOptions: function(options) {
      this.options = $.extend(true, {}, CollapsibleFieldset.DEFAULTS, options);

      return this;
    },

    build: function() {

      return this;
    },

    events: function() {
      var _self = this;

      this.$link.click(function () {
        // Don't animate multiple times.
        if (!_self.$fieldset.animating) {
          _self.$fieldset.animating = true;
          _self.toggleCollapse();
        }
        return false;
      });
    },

    toggleCollapse: function () {
      var _self = this;

      if (this.$fieldset.is('.collapsed')) {
        var $content = this.$wrapper.hide();
        this.$fieldset
          .removeClass('collapsed')
          .trigger({ type: 'collapsed', value: false })
          .find(this.options.iconSelector).removeClass(this.options.iconCollapsed).addClass(this.options.iconExpanded);
        $content.slideDown({
          duration: 'fast',
          easing: 'linear',
          complete: function () {
            _self.$fieldset.animating = false;
          }
        });
      }
      else {
        this.$fieldset.trigger({ type: 'collapsed', value: true });
        this.$wrapper.slideUp('fast', function () {
          _self.$fieldset
            .addClass('collapsed')
            .find(_self.options.iconSelector).removeClass(_self.options.iconExpanded).addClass(_self.options.iconCollapsed);
          _self.$fieldset.animating = false;
        });
      }
    }
  };

  // Expose to scope.
  $.extend(theme, {
    CollapsibleFieldset: CollapsibleFieldset
  });

  // Jquery plugin.
  $.fn.clCollapsibleFieldset = function(options) {
    return this.map(function() {
      var $this = $(this);
      new CollapsibleFieldset($this, options);
    });
  };

}).apply(this, [ window.theme, jQuery ]);
