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


/**
 * @file
 * Animation Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__animation';

  var Animation = function($element, options) {
    return this.init($element, options);
  };

  Animation.DEFAULTS = {
    delay: 500,
    infinite: false
  };

  Animation.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setDefaults: function () {
      this.defaults = Animation.DEFAULTS;
      return this;
    },

    setData: function() {
      this.$element.data(pluginName, this);
      return this;
    },

    setOptions: function(options) {
      this.options = $.extend(true, {}, this.defaults, options, {
        wrapper: this.$element
      });

      return this;
    },

    build: function() {
      var _self = this,
      $element = this.options.wrapper;

      $element.addClass('appear-animation');

      if (!$('html').hasClass('no-csstransitions')) {

        $element.on('appear', $element, function() {
          var delay = _self.options.delay;
          var infinite = _self.options.infinite;

          $element.addClass($element.attr('data-appear-animation')).addClass('animated');

          if (delay > 1) {
            $element.css('animation-delay', delay + 'ms');
          }

          setTimeout(function() {
            $element.addClass('appear-animation-visible');
          }, delay);

          if (infinite) {
            $element.addClass('infinite');
          }

        });

      }
      else {
        $element.addClass('appear-animation-visible');
      }

      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    Animation: Animation
  });

  // Jquery plugin.
  $.fn.clAnimation = function(options) {
    return this.map(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Animation($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);


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


/**
 * @file
 * Colorpicker Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__carousel';

  var Carousel = function($element, options) {
    return this.init($element, options);
  };

  Carousel.DEFAULTS = {
  };

  Carousel.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setDefaults: function () {
      this.defaults = Carousel.DEFAULTS;
      return this;
    },

    setData: function() {
      this.$element.data(pluginName, this);
      return this;
    },

    setOptions: function(options) {
      this.options = $.extend(true, {}, this.defaults, options, {
        wrapper: this.$element
      });
      return this;
    },

    build: function() {
      this.options.wrapper.owlCarousel(this.options).addClass("owl-carousel-init");
      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    Carousel: Carousel
  });

  // Jquery plugin.
  $.fn.clCarousel = function(options) {
    return this.map(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Carousel($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);


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


/**
 * @file
 * Colorpicker Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__colorpicker';

  var Colorpicker = function($element, options) {
    return this.init($element, options);
  };

  Colorpicker.DEFAULTS = {};

  Colorpicker.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setDefaults: function () {
      this.defaults = Colorpicker.DEFAULTS;
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
      this.$element.colorpicker(this.options);
      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    Colorpicker: Colorpicker
  });

  // Jquery plugin.
  $.fn.clColorpicker = function(options) {
    return this.map(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Colorpicker($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);


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


/**
 * @file
 * FormDescription.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = 'formdescription';

  var FormDescription = function (element, options) {
    return this.init(element, options);
  };

  FormDescription.DEFAULTS = {
    input: false,
    display: 'placeholder',
    icon: '<i class="icon icon-question-circle"></i>'
  };

  FormDescription.prototype = {

    constructor: FormDescription,

    init: function (element, options) {
      this.$element = $(element);
      this.setOptions(options);
      this.setVars();
      this.setData();
      if (this.$item !== false) {
        this.build();
        this.events();
      }

      return this;
    },

    setData: function() {
      this.$element.data(pluginName, this);

      return this;
    },

    setOptions: function(options) {
      this.options = $.extend(true, {}, FormDescription.DEFAULTS, options);
    },

    setVars: function () {
      this.text     = this.$element.text();
      this.textHtml = this.$element.html();
      this.icon = $.isArray(this.options.icon) ? this.options.icon[0] : this.options.icon;
      this.$icon = $('<a></a>')
                    .addClass('form-description-icon')
                    .append(this.icon);
      this.setItem();
    },

    setItem: function () {
      var $item = false;

      if (this.options.input !== false && $(this.options.input).length > 0) {
        $item = $(this.options.input);
      }
      else {
       // Try to find the item if not setted in options.input.
       if (this.$element.prev('input').length > 0) {
        $item = this.$element.prev('input');
        }
        else if (this.$element.prev('textarea').length > 0) {
          $item = this.$element.prev('textarea');
        }
        else if (this.$element.prev('select').length > 0) {
          $item = this.$element.prev('select');
        }
        else if (this.$element.prev('div').length > 0) {
          var parent = this.$element.prev('div');
          if (parent.find('input').length > 0) {
            $item = parent.find('input');
          }
          else if (parent.find('textarea').length > 0) {
            $item = parent.find('textarea');
          }
          else if (parent.find('select').length > 0) {
            $item = parent.find('select');
          }
        }
      }

      this.$item = $item;

      return this;
    },

    build: function () {
      switch (this.options.display) {
        case 'placeholder':
          var placeholder = this.$item.attr('placeholder');
          if (typeof placeholder === typeof undefined || placeholder === false) {
            this.displayPlaceholder();
          }
          break;

        case 'after-form-item':
          this.displayAfterItem();
          break;

        case 'after-label':
          this.displayAfterLabel();
          break;
      }
    },

    events: function () {
      var _self = this;

      if (this.options.display == 'placeholder') {
        this.$item
          .on('focusin', function(){
            $(this).popover('show');
            $(this).attr('placeholder', '');
          })
          .on('focusout', function(){
            $(this).attr('placeholder', _self.text);
            $(this).popover('hide');
          });
      }
    },

    displayPlaceholder: function(){
      this.$item.attr('placeholder', this.text);
      var rt = ($(window).width() - (this.$item.offset().left + this.$item.outerWidth()));
      var pos = (this.$item.offset().left !== 0 && rt > 280) ? 'right' : 'top';
      this.addPopover(this.$item, pos);
      this.$item.popover('hide');
      this.hideElement();
    },

    displayAfterItem: function(){
      if (!this.$element.hasClass('form-description-after-item')) {
        // Wrap the form group and add the icon.
        var $wrapper = $('<div class="form-description-wrapper"></div>');
        var $formGroup = this.$item.closest('.form-group');
        $formGroup
          .append(this.$icon)
          .wrapInner($wrapper);

        var rt = ($(window).width() - ($formGroup.offset().left + $formGroup.outerWidth()));
        var pos = 'left';
        if (this.$item.offset().left !== 0 && rt > 140) {
          pos = 'top';
        }
        if (this.$item.offset().left !== 0 && rt > 280) {
          pos = 'right';
        }

        this.addPopover(this.$icon, pos);
        this.hideElement();
        this.$element.addClass('form-description-after-item');
      }
    },

    displayAfterLabel: function(){
      if (!this.$element.hasClass('form-description-label')) {
        var $label = $('label[for="' + this.$item.attr('id') + '"]');
        var pos = 'top';
        this.addPopover(this.$icon, pos);

        $label.append(this.$icon);
        this.hideElement();
        this.$element.addClass('form-description-processed-label');
      }
    },

    hideElement: function () {
      this.$element.hide();
    },

    addPopover: function ($el, position) {
      var icon = this.options.icon,
      textHtml = this.textHtml;
      var trigger = $el.hasClass('form-description-icon') ? "hover click" : "manual";
      $el.popover({
        html: true,
        trigger: trigger,
        content: icon + textHtml,
        placement: position,
        template: '<div class="popover popover-form-description"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
      });

      $(window).on('scroll', function(){
        $el.popover('hide');
      });

      this.$popoverEl = $el;

      return this;
    }

  };

  // Expose to scope.
  $.extend(theme, {
    FormDescription: FormDescription
  });

  // Jquery plugin.
  $.fn.formDescription = function (options) {
    return this.each(function () {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new FormDescription($this, options);
      }
      else {
        $this.data( pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);


/**
 * @file
 * Lightbox plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__lightbox';

  var Lightbox = function($element, options) {
    return this.init($element, options);
  };

  Lightbox.DEFAULTS = {
    tClose: 'Close (Esc)',
    // Alt text on close button.
    tLoading: 'Loading...',
    // Text that is displayed during loading. Can contain %curr% and %total% keys.
    gallery: {
      tPrev: 'Previous (Left arrow key)',
      // Alt text on left arrow.
      tNext: 'Next (Right arrow key)',
      // Alt text on right arrow.
      tCounter: '%curr% of %total%'
      // Markup for "1 of 7" counter.
    },
    image: {
      tError: '<a href="%url%">The image</a> could not be loaded.'
      // Error message when image could not be loaded.
    },
    ajax: {
      tError: '<a href="%url%">The content</a> could not be loaded.'
      // Error message when ajax request failed.
    }
  };

  Lightbox.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setData: function() {
      this.$element.data(pluginName, this);
      return this;
    },

    setDefaults: function () {
      this.defaults = Lightbox.DEFAULTS;
      return this;
    },

    setOptions: function(options) {
      this.options = $.extend(true, {}, this.defaults, options, {
        wrapper: this.$element
      });

      return this;
    },

    build: function() {
      this.options.wrapper.magnificPopup(this.options);
      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    Lightbox: Lightbox
  });

  // Jquery plugin.
  $.fn.clLightbox = function(options) {
    return this.each(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Lightbox($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);


/**
 * @file
 * Masked Input Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__maskedInput';

  var MaskedInput = function($element, options) {
    return this.init($element, options);
  };

  MaskedInput.DEFAULTS = {};

  MaskedInput.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setData: function() {
      this.$element.data(pluginName, this);

      return this;
    },

    setDefaults: function () {
      this.defaults = MaskedInput.DEFAULTS;
      return this;
    },

    setOptions: function(options) {
      this.options = $.extend(true, {}, this.defaults, options);
      return this;
    },

    build: function() {
      this.$element.mask(this.$element.data('input-mask'), this.options);
      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    MaskedInput: MaskedInput
  });

  // Jquery plugin.
  $.fn.clMaskedInput = function(options) {
    return this.map(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new MaskedInput($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);


/**
 * @file
 * MaxLength Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__maxlength';

  var MaxLength = function($element, options) {
    return this.init($element, options);
  };

  MaxLength.DEFAULTS = {
    alwaysShow: true,
    warningClass: "label label-info",
    limitReachedClass: "label label-danger",
    separator: ' of ',
    preText: 'used ',
    postText: ' chars',
    placement: 'bottom-right-inside',
    validate: true
  };

  MaxLength.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setData: function() {
      this.$element.data(pluginName, this);

      return this;
    },

    setDefaults: function () {
      this.defaults = MaxLength.DEFAULTS;
      return this;
    },

    setOptions: function(options) {
      this.options = $.extend(true, {}, this.defaults, options);
      return this;
    },

    build: function() {
      this.$element.maxlength(this.options);
      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    MaxLength: MaxLength
  });

  // Jquery plugin.
  $.fn.clMaxLength = function(options) {
    return this.map(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new MaxLength($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);


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


/**
 * @file
 * ScrollToTop Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__scrolltotop';

  var PluginScrollToTop = function($element, options) {
    return this.init($element, options);
  };

  PluginScrollToTop.DEFAULTS = {
    offset: 150,
    delay: 800,
    visibleMobile: false,
    label: false
  };

  PluginScrollToTop.prototype = {
    init: function($element, options) {
      this.$element = $element;

      this
        .setOptions(options)
        .build()
        .events();

      return this;
    },

    setOptions: function(options) {
      this.options = $.extend(true, {}, PluginScrollToTop.DEFAULTS, options);

      return this;
    },

    build: function() {
      var self = this;

      // Visible Mobile.
      if (!self.options.visibleMobile) {
        this.$element.addClass('hidden-xs');
      }

      return this;
    },

    events: function() {
      var self = this,
          _isScrolling = false;

      // Click Element Action.
      self.$element.on('click', function(e) {
        e.preventDefault();
        $('body, html').animate({
          scrollTop: 0
        }, self.options.delay);
        return false;
      });

      // Show/Hide Button on Window Scroll event.
      $(window).scroll(function() {
        if (!_isScrolling) {
          _isScrolling = true;
          if ($(window).scrollTop() > self.options.offset) {
            self.$element.stop(true, true).addClass('show');
            _isScrolling = false;
          }
          else {
            self.$element.stop(true, true).removeClass('show');
            _isScrolling = false;
          }
        }
      });

      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    PluginScrollToTop: PluginScrollToTop
  });

  // Jquery plugin.
  $.fn.clPluginScrollToTop = function(options) {
    return this.map(function() {
      if (!$.data(this, pluginName)) {
        $.data(this, pluginName,
          new PluginScrollToTop($(this), options));
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);


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


/**
 * @file
 * Slider Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__slider';

  var Slider = function($element, options) {
    return this.init($element, options);
  };

  Slider.DEFAULTS = {};

  Slider.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setOutput();
      this.setTooltip();
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setDefaults: function () {
      this.defaults = Slider.DEFAULTS;
      return this;
    },

    setData: function() {
      this.$element.data(pluginName, this);
      return this;
    },

    setOptions: function(options) {
      var _self = this;
      this.options = $.extend(true, {}, this.defaults, options);

      if (this.$output || this.$tooltip) {
        $.extend(this.options, {
          slide: function(event, ui) {
            _self.onSlide(event, ui);
          }
        });
      }

      return this;
    },

    setOutput: function() {
      var $output = $(this.$element.data('plugin-slider-output'));
      this.$output = $output.get(0) ? $output : null;

      return this;
    },

    setTooltip: function() {
      var $tooltip = null;
      if (this.$element.data('plugin-slider-tooltip')) {
        $tooltip = $('<div id="slider-tooltip" />').css({
          position: 'absolute',
          top: -25,
          left: -8,
          opacity: 1
        }).hide();
      }
      this.$tooltip = $tooltip;

      return this;
    },

    build: function() {
      this.$element.slider(this.options);
      if (this.$tooltip) {
        var tooltip = this.$tooltip;
        this.$element.find(".ui-slider-handle").append(tooltip).hover(function() {
            tooltip.show();
        }, function() {
            tooltip.hide();
        });
      }
      return this;
    },

    onSlide: function(event, ui) {
      if (!ui.values) {
        if (this.$output) {
          this.$output.val(ui.value);
        }
        if (this.$tooltip) {
          this.$tooltip.text(ui.value);
        }
      }
      else {
        if (this.$output) {
          this.$output.val(ui.values[ 0 ] + '/' + ui.values[ 1 ]);
        }
      }

      if (this.$output) {
        this.$output.trigger('change');
      }
    }
  };

  // Expose to scope.
  $.extend(theme, {
    Slider: Slider
  });

  // Jquery plugin.
  $.fn.clSlider = function(options) {
    return this.each(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Slider($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);


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


/**
 * @file
 * TaskList.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__tasklist';

  var TaskList = function($element) {
    return this.init($element);
  };

  TaskList.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setData();
      this.build();
      this.events();

      return this;
    },

    setData: function() {
      this.$element.data(pluginName, this);
      return this;
    },

    check: function( input, label ) {
      if ( input.is(':checked') ) {
        label.addClass('text-line-through');
      } else {
        label.removeClass('text-line-through');
      }
    },

    build: function() {
      var _self = this,
          $check = this.$element.find('.task-check');

      $check.each(function () {
        var label = $(this).closest('li').find('.task-label');
        _self.check( $(this), label );
      });

      return this;
    },

    events: function() {
      var _self = this,
          $remove = this.$element.find( '.task-remove' ),
          $check = this.$element.find('.task-check'),
          $window = $( window );

      $remove.on('click.widget-task-list', function( e ) {
        e.preventDefault();
        $(this).closest("li").remove();
      });

      $check.on('change', function () {
        var label = $(this).closest('li').find('.task-label');
        _self.check( $(this), label );
      });

      return this;
    }
  };

  // expose to scope
  $.extend(theme, {
    TaskList: TaskList
  });

  // jquery plugin
  $.fn.clTaskList = function() {
    return this.map(function() {
      var $this = $(this);

      if ($this.data(pluginName)) {
        return $this.data(pluginName);
      }
      else {
        return new TaskList($this);
      }

    });
  };

}).apply(this, [ window.theme, jQuery ]);


/**
 * @file
 * Timepicker Plugin.
 */

(function(theme, $) {

  theme = theme || {};

  var pluginName = '__timepicker';

  var Timepicker = function($element, options) {
    return this.init($element, options);
  };

  Timepicker.DEFAULTS = {};

  Timepicker.prototype = {
    init: function($element, options) {
      this.$element = $element;
      this.setDefaults();
      this.setData();
      this.setOptions(options);
      this.build();

      return this;
    },

    setDefaults: function () {
      this.defaults = Timepicker.DEFAULTS;
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
      this.$element.timepicker(this.options);
      return this;
    }
  };

  // Expose to scope.
  $.extend(theme, {
    Timepicker: Timepicker
  });

  // Jquery plugin.
  $.fn.clTimepicker = function(options) {
    return this.map(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Timepicker($this, options);
      }
      else {
        $this.data(pluginName);
      }
    });
  };

}).apply(this, [ window.theme, jQuery ]);
