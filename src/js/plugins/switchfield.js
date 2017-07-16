/**
 * @file
 * Switchfield.
 */

(function(theme, $) {

  'use strict';

  theme = theme || {};

  // Jquery plugin.
  $.fn.switchfield = function () {
    return this.each(function () {
      var $this = $(this);
      var $handle = $this.find('.switcher').closest('div').addClass('switch-handle');

      // Hide the original input.
      $this.find('input[type="checkbox"]').hide();

      // Change input if switched.
      $this.on('click', '.switch-handle', function(event) {
        event.preventDefault();
        var $checkbox = $(this).prev('input[type="checkbox"]');
        $checkbox.trigger('click');

        // Add warning class if changed to elements has .switch-warning-on-change class .
        if ($this.hasClass('switch-warning-on-change') && !$this.hasClass('switch-warning')) {
          $this.addClass('switch-warning');
        }
      });
    });
  };

}).apply(this, [ window.theme, jQuery ]);
