(function(exports){
// Replace this function with bezierDraw on touchmove
  exports.MobileControls = function(){}
  MobileControls.onTouchMove = function(e){
    var touch = e.originalEvent.touches[0]
    return cp2 = new Point(touch.pageX, touch.pageY)
  }

})(window)