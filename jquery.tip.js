
/**
 * popup a tip box around the elements
 * @param {String|DOM|jQueryObject} content the content for html method
 * @param {Object} options tip options
 * {
 *   place: 'left' | 'right' |'top' | 'bottom', default: 'auto'
 * }
 */

(function ($) {
  $.fn.tip = function (content, options) {
    var $tip = get_tip(this.eq(0), content, options);
    if (content) $tip.html(content);
    return $tip;
  };

  var $container;
  var tpl = '<div class="jq-tip"><i class="jq-tip-arrow"></i></div>';

  function get_tip ($e, content, options) {
    var $tip = $e.data('jq-tip');
    if ($tip) return $tip;
    if (!content) return $();

    if (!$container) $container = $('body').append('<div>');
    options = $.extend({ place: 'auto' }, options);
    var o = $e.offset();

    $tip = $(tpl).appendTo($container).offset(o);
    return $tip;
  }
})(jQuery);
