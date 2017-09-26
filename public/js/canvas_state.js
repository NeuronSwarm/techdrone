CanvasState = function(){
  this.curves = []
  this.tmp; 
  var _state = this;

  this.curve = function(start, cp1, cp2, end){
    if(cp1 == null)
      cp1 = start;

    this.start = start;
    this.cp1 = cp1;
    this.cp2 = cp2;
    this.end = end;
    _state.tmp = this;

    this.draw = function(ctx){
      ctx.beginPath();
      ctx.moveTo(this.start.x, this.start.y);
      ctx.bezierCurveTo(this.cp1.x, this.cp1.y,
                        this.cp2.x, this.cp2.y,
                        this.end.x, this.end.y);
      ctx.stroke();
      ctx.closePath();
    }
    this.toJSON = function(){
      _curve = _state.tmp
      return {
        curve: {
          start: {
            x: _curve.start.x,
            y: _curve.start.y
          },
          cp1: {
            x: _curve.cp1.x,
            y: _curve.cp1.y
          },
          cp2: {
            x: _curve.cp2.x,
            y: _curve.cp2.y
          },
          end: {
            x: _curve.end.x,
            y: _curve.end.y
          }
        }
      }
    }
  }

  // save the latest curve
  this.saveNewCurve = function(){
    _state.curves.push(_state.tmp);
  }
  this.load = function(data, ctx){
    _state.curves = [];
    _curve = CurveFromJSON(data)
    _state.curves.push(_curve)
    _curve.draw(ctx);
  }
}

var CurveFromJSON = function(data){
  _curve = data.curve
  start = new Point(_curve.x1,_curve.y1)
  cp1 = new Point(_curve.x2,_curve.y2)
  cp2 = new Point(_curve.x3,_curve.y3)
  end = new Point(_curve.x4,_curve.y4)
  return new canvasState.curve(start, cp1, cp2, end);

}