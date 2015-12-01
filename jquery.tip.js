
/**
 * popup a tip box around the elements
 * @param {String|DOM|jQueryObject} content the content for html method
 * @param {Object} options tip options
 * {
 *   timeout: 5, //seconds
 *   place:   'right', 'top', 'left', 'bottom',
 *            'right top',    'right bottom',
 *            'top left',     'top right',
 *            'left top',     'left bottom',
 *            'bottom left',  'bottom right'
 * }
 */

(function ($) {
  $.fn.tip = function (content, options) {
    var $target = this.eq(0);
    var $tip = get_or_create_tip($target, content);
    if (content) {
      $tip.html('<i class="jq-tip-arrow"></i>');
      $tip.append(content);
      if (options && options.place) {
        set_pos($tip, $target, $.trim(options.place));
      } else {
        set_pos($tip, $target, '');
      }
    }
    return $tip;
  };

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

  var places = [
    'top', 'right', 'bottom', 'left',
    'top left',     'top right',
    'right top',    'right bottom',
    'bottom left',  'bottom right',
    'left top',     'left bottom'
  ];

  function set_pos($tip, $target, place) {
    $tip.removeClass('left right top bottom');
    var offset = $target.offset();
    var place = place.split(/\s+/);
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
    $tip.offset(offset).show();
  }

  function try_pos() {
  }

  function pos_right(offset, $tip, $target, place) {
    $tip.addClass('right');
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
    $tip.addClass('left');
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
    $tip.addClass('top');
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
    $tip.addClass('bottom');
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
})(jQuery);
