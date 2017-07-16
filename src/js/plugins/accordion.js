/**
 * @file
 * Accordion.
 */

(function(theme, $) {

  theme = theme || {};

  var Accordion = function($element, options) {
    return this.init($element, options);
  };

  Accordion.DEFAULTS = {
    collapsedIconSelector: '> .panel-heading .accordion-icon-collapsed',
    expandedIconSelector: '> .panel-heading .accordion-icon-expanded'
  };

  Accordion.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setOptions();
      this.collapsedIcon = this.$element.find(this.options.collapsedIconSelector);
      this.expandedIcon = this.$element.find(this.options.expandedIconSelector);
      this.build();
      this.events();

      return this;
    },

    setOptions: function(options) {
      this.options = $.extend(true, {}, Accordion.DEFAULTS, options);

      return this;
    },

    build: function() {
      var _self = this;

      this.$element.find('> .panel-heading .accordion-actions').each(function() {
        console.log(_self.isExpanded());
        _self.toggle(_self.isExpanded());
      });

      return this;
    },

    events: function() {
      var _self = this;

      this.$element.on('show.bs.collapse', function() {
        _self.toggle(true);
      });

      this.$element.on('hide.bs.collapse', function() {
        _self.toggle(false);
      });
    },
    /**
   * Toggle Accordion.
   */
    toggle: function (isExpanded) {
      if (isExpanded) {
        this.collapsedIcon.hide();
        this.expandedIcon.show();
      }
      else {
        this.collapsedIcon.show();
        this.expandedIcon.hide();
      }
    },

    isExpanded: function () {
      return this.$element.find('> .accordion-body').hasClass('in');
    }
  };

  // Expose to scope.
  $.extend(theme, {
    Accordion: Accordion
  });

  // Jquery plugin.
  $.fn.clAccordion = function(options) {
    return this.map(function() {
      var $this = $(this);
      new Accordion($this, options);
    });
  };

}).apply(this, [ window.theme, jQuery ]);
