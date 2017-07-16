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
