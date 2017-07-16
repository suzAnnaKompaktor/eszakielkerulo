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
