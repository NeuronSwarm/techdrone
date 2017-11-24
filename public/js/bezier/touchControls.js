(function(exports){
// Replace this function with bezierDraw on touchmove
  exports.MobileControls = function(){}
  MobileControls.onTouchMove = function(e){
    var touch = e.originalEvent.touches[0]
    var cp2 = new Point(touch.pageX, touch.pageY)
    console.log('touch controls: ' + cp2.toString())
    return bezierDraw(e, cp2)
  }

})(window)