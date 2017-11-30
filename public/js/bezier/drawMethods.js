
(function(exports){
  class DrawMethods {
    static quadraticBezier(m_points){
      if(m_points.mid == null)
        m_points.mid = m_points.cp2;
      var cp1 = _helper(0.25, m_points.begin, m_points.mid, m_points.end)
      var cp2 = _helper(0.75, m_points.begin, m_points.mid, m_points.end)
      return { begin: m_points.begin, cp1: cp1, cp2: cp2, end: m_points.end }
    }
  }
  // B(t) = (1-t)^2 * P_0 + 2(1-t)t*P_1 + (t^2)P_2
  var  _helper = function(t, begin, mid, end){
    var coBegin = Math.pow((1-t),2)
    var coMid = 2*(1-t)*t
    var coEnd = Math.pow(t,2)
    return begin.multiply(coBegin).add(mid.multiply(coMid)).add(end.multiply(coEnd))
  }
  exports.DrawMethods = DrawMethods;
})(window)