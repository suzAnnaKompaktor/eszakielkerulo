/**
 * @file
 * Secondary tabs.
 */

(function(theme, $) {

  theme = theme || {};

  var SecondaryTabs = function($element) {
    return this.init($element);
  };

  SecondaryTabs.prototype = {
    init: function($element) {
      this.$element = $element;
      this.build();
      this.events();

      return this;
    },

    build: function() {
      var _self = this;
      this.hideSecondaryTabs();

      this.$element.find('.nav-tabs-primary li').each(function() {
        if($(this).hasClass('active')){
          _self.showSecondaryTab($(this).data('tabs-children'));
        }
      });
    },

    events: function() {
      var _self = this;

      this.$element.find('.nav-tabs-primary li').each(function() {
        $(this).on('click', function(){
          _self.hideSecondaryTabs();
          var tabsChildren = $(this).attr('data-tabs-children');
          if (typeof tabsChildren !== typeof undefined && tabsChildren !== false) {
            _self.showSecondaryTab(tabsChildren);
          }
        });
      });
    },

    showSecondaryTab: function(id) {
      console.log(this.$element.find('.nav-tabs-secondary#' + id));
      this.$element.find('.nav-tabs-secondary#' + id).show();
    },

    hideSecondaryTabs: function() {
      this.$element.find('.nav-tabs-secondary').hide();
    }
  };

  // Expose to scope.
  $.extend(theme, {
    SecondaryTabs: SecondaryTabs
  });

  // Jquery plugin.
  $.fn.clSecondaryTabs = function() {
    return this.map(function() {
      var $this = $(this);
      new SecondaryTabs($this);
    });
  };

}).apply(this, [ window.theme, jQuery ]);
