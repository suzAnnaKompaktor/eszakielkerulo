/**
 * @file
 * Init functions.
 */

// ScrollToTop
(function($) {

  'use strict';

  if ( typeof $.fn.clPluginScrollToTop === 'function' ) {
    $('.scroll-to-top').clPluginScrollToTop();
  }

})(jQuery);

// Switch
(function($) {

  'use strict';

  if ( typeof $.fn.switchfield === 'function' ) {
    $('.switch').switchfield();
  }

})(jQuery);

// Panel
(function($) {

  'use strict';

  if ( typeof $.fn.clPanel === 'function' ) {
    $('.panel').clPanel();
  }

})(jQuery);

// CollapsibleFieldset
(function($) {

  'use strict';

  if ( typeof $.fn.clCollapsibleFieldset === 'function' ) {
    $('fieldset.collapsible').clCollapsibleFieldset();
  }

})(jQuery);


// Widgets
(function( $ ) {

  'use strict';

  $('.widget').on('click', '.widget-toggle', function() {
    var $widget = $( this ).closest('.widget');
    $widget.find('.widget-content').slideToggle();
    $widget.toggleClass('collapsed');
  });

})(jQuery);


// Accordation
(function($) {

  'use strict';

  if ( typeof $.fn.clAccordion === 'function' ) {
    $('.panel-accordion').clAccordion();
  }

})(jQuery);

// Secondary tabs
(function($) {

  'use strict';

  if ( typeof $.fn.clSecondaryTabs === 'function' ) {
    $('.tabs').clSecondaryTabs();
  }

})(jQuery);

// Popover
(function( $ ) {

  'use strict';

  if ( typeof $.fn.popover === 'function' ) {
    $( '[data-toggle=popover]' ).popover();

    $(window).on('scroll', function(){
      $( '[data-toggle=popover]' ).popover('hide');
    });
  }

}).apply( this, [ jQuery ]);

// Tooltip
(function( $ ) {

  'use strict';

  if ( typeof $.fn.tooltip === 'function' ) {
    $( '[data-toggle=tooltip],[rel=tooltip]' ).tooltip({ container: 'body' });
  }

}).apply( this, [ jQuery ]);


// Select2
(function( $ ) {

  'use strict';

  if ( typeof $.fn.clSelect2 === 'function' ) {

    $(function() {
      $('[data-plugin-select2], .select-custom').each(function() {
        var $this = $( this );
        var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-select2') : {} );
        var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
        $this.clSelect2(options);
      });
    });

  }

}).apply(this, [ jQuery ]);

// UI sortable
(function($) {

  'use strict';

  if ( typeof $.fn.sortable === 'function' ) {
    $('.ui-sortable').sortable();
  }

}).apply( this, [ jQuery ]);

//Task
(function( $ ) {

  'use strict';

  if ( typeof $.fn.clTaskList === 'function' ) {

    $(function() {
      $('[data-plugin-task-list], ul.widget-task-list').each(function() {
        var $this = $( this );
        $this.clTaskList();
      });
    });

  }

}).apply(this, [ jQuery ]);

// Modal
(function( $ ) {

  'use strict';

  if ( typeof $.fn.magnificPopup === 'function' ) {
    $('.modal-dismiss').on('click', function (e) {
      $.magnificPopup.close();
    });
  }

}).apply( this, [ jQuery ]);

// Lightbox
(function( $ ) {

  'use strict';

  if ( typeof $.fn.clLightbox === 'function' ) {

    $(function() {
      $('[data-plugin-lightbox], .lightbox:not(.manual)').each(function() {
        var $this = $( this );
        var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-lightbox') : {} );
        var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
        $this.clLightbox(options);
      });
    });

  }

}).apply(this, [ jQuery ]);

// Slider
(function( $ ) {

  'use strict';

  if ( typeof $.fn.clSlider === 'function' ) {

    $(function() {
      $('[data-plugin-slider]').each(function() {
        var $this = $( this );
        var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-slider') : {} );
        var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
        $this.clSlider(options);
      });
    });

  }

}).apply(this, [ jQuery ]);

// Carousel
(function( $ ) {

  'use strict';

  if ( typeof $.fn.clCarousel === 'function' ) {

    $(function() {
      $('[data-plugin-carousel]').each(function() {
        var $this = $( this );
        var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-carousel') : {} );
        var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
        $this.clCarousel(options);
      });
    });

  }

}).apply(this, [ jQuery ]);

// Animations
(function( $ ) {

  'use strict';

  if ( typeof $.fn.clAnimation === 'function' ) {
    $(function() {
      $('[data-plugin-animate], [data-appear-animation]').each(function() {
        var $this = $( this );
        var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-animation') : {} );
        var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
        $this.clAnimation(options);
      });
    });

  }

}).apply(this, [ jQuery ]);

// MaxLength
(function( $ ) {

  'use strict';

  if ( typeof $.fn.clMaxLength === 'function' ) {

    $(function() {
      $('[data-plugin-maxlength]').each(function() {
        var $this = $( this );
        var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-maxlength') : {} );
        var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
        $this.clMaxLength(options);
      });
    });

  }

}).apply(this, [ jQuery ]);

// Fileinput
(function( $ ) {

  'use strict';

  if ( typeof $.fn.clFileInput === 'function' ) {

    $(function() {
      $('[data-plugin-fileinput], [class="fileinput"]').each(function() {
        var $this = $( this );
        var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-fileinput') : {} );
        var options = $.extend(true, {}, $this.data('plugin-options'), html5data);
        $this.clFileInput(options);
      });
    });

  }

}).apply(this, [ jQuery ]);


// Form description
(function( $ ) {

  'use strict';

  if ( typeof $.fn.formDescription === 'function' && typeof $.fn.popover === 'function' ) {
    $('[data-form-description]').each(function() {
      var $this = $( this );
      var html5data = (typeof $.html5data === 'function' ? $this.html5data('form-description') : {});
      var options = $.extend(true, options, $this.data('plugin-options'), html5data);

      $this.formDescription(options);
    });
  }

}).apply(this, [ jQuery ]);

// Masked Input
(function( $ ) {

  'use strict';

  if ( typeof $.fn.clMaskedInput === 'function' ) {

    $(function() {
      $('[data-plugin-maskedinput]').each(function() {
        var $this = $( this );
        var html5data = (typeof $.html5data === 'function' ? $this.html5data('plugin-maskedinput') : {});
        var options = $.extend(true, options, $this.data('plugin-options'), html5data);

        $this.clMaskedInput(options);
      });
    });

  }

}).apply(this, [ jQuery ]);


// Datepicker
(function( $ ) {

  'use strict';

  if ( typeof $.fn.clDatepicker === 'function' ) {

    $(function() {

      $('[data-plugin-datepicker]').each(function() {
        var $this = $( this );
        var html5data = (typeof $.html5data === 'function' ? $this.html5data('plugin-datepicker') : {});
        var options = $.extend(true, options, $this.data('plugin-options'), html5data);

        $this.clDatepicker(options);
      });
    });

  }

}).apply(this, [ jQuery ]);

// Timepicker
(function( $ ) {

  'use strict';

  if ( typeof $.fn.clTimepicker === 'function' ) {

    $(function() {
      $('[data-plugin-timepicker]').each(function() {
        var $this = $( this );
        var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-timepicker') : {} );
        var options = $.extend(true, {}, $this.data('plugin-options'), html5data);

        $this.clTimepicker(options);
      });
    });

  }

}).apply(this, [ jQuery ]);

// Colorpicker
(function( $ ) {

  'use strict';

  if ( typeof $.fn.clColorpicker === 'function' ) {

    $(function() {
      $('[data-plugin-colorpicker]').each(function() {
        var $this = $( this );
        var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-colorpicker') : {} );
        var options = $.extend(true, {}, $this.data('plugin-options'), html5data);

        $this.clColorpicker(options);
      });
    });

  }

}).apply(this, [ jQuery ]);

// MaxLength
(function( $ ) {

  'use strict';

  if ( typeof $.fn.clMaxLength === 'function' ) {

    $(function() {
      $('[data-plugin-maxlength]').each(function() {
        var $this = $( this );
        var html5data = ( typeof $.html5data === 'function' ? $this.html5data('plugin-maxlength') : {} );
        var options = $.extend(true, {}, $this.data('plugin-options'), html5data);

        $this.clMaxLength(options);
      });
    });

  }

}).apply(this, [ jQuery ]);
