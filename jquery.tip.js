
/**
 * popup a tip box around the elements
 * @param {String|DOM|jQueryObject} content the content for html method
 * @param {Object} options tip options
 * {
 *   place:   'right', 'top', 'left', 'bottom',
 *            'right top',    'right bottom',
 *            'top left',     'top right',
 *            'left top',     'left bottom',
 *            'bottom left',  'bottom right'
 *   time:     5, //seconds,
 *   show_on: 'mouseenter',
 *   hide_on: { tip: 'mouseout', target: 'change' }
 * }
 */

(function ($) {
  $.fn.tip = tip;

  function tip (content, options) {
    options = $.extend({}, tip.defaults, options);
    var $target = this.eq(0);
    var $tip = get_or_create_tip($target, content);
    if (!content) return $tip;

    $tip.html('<i class="jq-tip-arrow"></i>');
    $tip.append(content);
    set_pos($tip, $target, options.place);
    set_show($tip, $target, options.show_on);
    set_hide($tip, $target, options.hide_on);
    set_timer($tip, options.time);
    return $tip;
  };

  tip.defaults = { hide_on: { target: 'change' } };

  var $container;

  function get_or_create_tip($target, content) {
    var $tip = $target.data('jq-tip');
    if ($tip) return $tip;
    if (!content) return $();

    if (!$container) $container = $('body').append('<div>');
    $tip = $('<div class="jq-tip">').appendTo($container);
    $target.data('jq-tip', $tip);
    $tip.data('target', $target);
    return $tip;
  }

  // [
  //   'top', 'right', 'bottom', 'left',
  //   'top left',     'top right',
  //   'right top',    'right bottom',
  //   'bottom left',  'bottom right',
  //   'left top',     'left bottom'
  // ];

  function set_pos($tip, $target, place) {
    $tip.removeClass('l r t b');
    place = place ? $.trim(place).split(/\s+/) : '';

    var offset = $target.offset();
    switch(place[0]) {
      case 'right':
        pos_right(offset, $tip, $target, place[1]);
        break;
      case 'left':
        pos_left(offset, $tip, $target, place[1]);
        break;
      case 'bottom':
        pos_bottom(offset, $tip, $target, place[1]);
        break;
      default:
        pos_top(offset, $tip, $target, place[1]);
    }
    $tip.offset(offset);
  }

  function try_pos() {
  }

  function pos_right(offset, $tip, $target, place) {
    $tip.addClass('r');
    offset.left += $target.outerWidth() + 5;
    switch (place) {
      case 'top':
        break;
      case 'bottom':
        offset.top += ($target.outerHeight() - $tip.outerHeight());
        break;
      default:
        offset.top += ($target.outerHeight() - $tip.outerHeight()) / 2;
    }
  }

  function pos_left(offset, $tip, $target, place) {
    $tip.addClass('l');
    offset.left -= ($tip.outerWidth() + 5);
    switch (place) {
      case 'top':
        break;
      case 'bottom':
        offset.top += ($target.outerHeight() - $tip.outerHeight());
        break;
      default:
        offset.top += ($target.outerHeight() - $tip.outerHeight()) / 2;
    }
  }

  function pos_top(offset, $tip, $target, place) {
    $tip.addClass('t');
    offset.top -= ($tip.outerHeight() + 5);
    switch (place) {
      case 'left':
        break;
      case 'right':
        offset.left += ($target.outerWidth() - $tip.outerWidth());
        break;
      default:
        offset.left += ($target.outerWidth() - $tip.outerWidth()) / 2;
    }
  }


  function pos_bottom(offset, $tip, $target, place) {
    $tip.addClass('b');
    offset.top += ($target.outerHeight() + 5);
    switch (place) {
      case 'left':
        break;
      case 'right':
        offset.left += ($target.outerWidth() - $tip.outerWidth());
        break;
      default:
        offset.left += ($target.outerWidth() - $tip.outerWidth()) / 2;
    }
  }

  function set_show($tip, $target, event) {
    if (!event) {
      $tip.show(); return;
    }
    $target.on(event, function() {
      $tip.show();
    });
  }

  function set_hide($tip, $target, event) {
    if (event.tip) $tip.on(event.tip, function () {
      $tip.hide();
    });
    if (event.target) $target.on(event.target, function () {
      $tip.hide();
    });
  }

  function set_timer($tip, time) {
    if (!time) return;
    var timer = $tip.data('timer');
    if (timer) clearTimeout(timer);
    timer = setTimeout(function() {
      $tip.hide();
    }, time * 1000);
    $tip.data('timer', timer);
  }
})(jQuery);
