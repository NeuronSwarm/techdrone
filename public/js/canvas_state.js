CanvasState = function(){
  this.curves = []
  this.tmp; 
  var _state = this;

  this.curve = function(start, cp1, cp2, end){
    if(cp1 == null)
      cp1 = cp2;

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
      cp2.x += 15;
      cp2.y += 15;
      ctx.bezierCurveTo(this.cp2.x, this.cp2.y,
                        this.cp1.x, this.cp1.y,
                        this.start.x, this.start.y);
      ctx.fillStyle = "tomato";
      ctx.fill();
      ctx.closePath();

    }
    this.toJSON = function(){
      _curve = this;
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

  this.toJSON = function(canvasName){
    _tmp = { name: canvasName, canvas_state: []}
    this.curves.forEach(function(curve){
      _tmp.canvas_state.push(curve.toJSON())
    })
    return _tmp
  }
  // save the latest curve
  this.saveNewCurve = function(ctx){
    _state.tmp.draw(ctx);
    _state.curves.push(_state.tmp);
  }
  this.load = function(data, ctx){
    _state.curves = [];
    data.canvas_state.forEach(function(curveData){
      _curve = CurveFromJSON(curveData)
      _state.curves.push(_curve)
      _curve.draw(ctx);
    })
  }
}

var CurveFromJSON = function(data){
  _curve = data;
  start = new Point(_curve.x1,_curve.y1)
  cp1 = new Point(_curve.x2,_curve.y2)
  cp2 = new Point(_curve.x3,_curve.y3)
  end = new Point(_curve.x4,_curve.y4)
  return new canvasState.curve(start, cp1, cp2, end);

}