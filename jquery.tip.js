
/**
 * popup a tip box around the elements
 * @param {String|DOM|jQueryObject} content the content for html method
 * @param {Object} options tip options
 * {
 *   place: 'left' | 'right' |'top' | 'bottom', default: 'auto'
 * }
 */

(function ($) {
  $.fn.tip = get_tip;

  var $container;

  function get_tip (content, options) {
    var $e = this.eq(0);
    var $tip = $e.data('jq-tip');
    if ($tip) return $tip;
    if (!content) return $();

    if (!$container) $container = $('body').append('<div>');
    $tip = $('<div class="jq-tip">').appendTo($container);

    $tip.html('<i class="jq-tip-arrow"></i>');
    $tip.append(content);

    var o = $e.offset();
    o.left += $e.outerWidth() + 5;
    $tip.addClass('right').offset(o);

    $e.data('jq-tip', $tip);
    return $tip;
  }

  function try_place(o, $tip, place) {
    var $viewport = $(document); 
    
  }
})(jQuery);
