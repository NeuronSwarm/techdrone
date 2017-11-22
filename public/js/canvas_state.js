CanvasState = function(){
  this.thickness = 35;
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
    console.log(cp2)
    _state.tmp = this;

    var distance = function(vec1, vec2){
      return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2))
    }
    var multiply = function(scalar, vec){
      return new Point(scalar*vec.x, scalar*vec.y);
    }
    this.draw = function(ctx){
      _curve = this;
      ctx.beginPath();
      ctx.moveTo(this.start.x, this.start.y);
      ctx.bezierCurveTo(this.cp1.x, this.cp1.y,
                        this.cp2.x, this.cp2.y,
                        this.end.x, this.end.y);
      // _tmp = new Point(cp2.x + _state.thickness, cp2.y + _state.thickness);
      mid = _curve.midpoint();
      //console.log(['start: ' + start.toString(), 'mid: ' + mid.toString(),'end: ' + end.toString()])
      var scale = distance(mid, this.cp2);
      console.log(scale)
      _tmp = mid.add(multiply(_curve.normal(), scale))
      //console.log(_tmp)
      ctx.bezierCurveTo(_tmp.x, _tmp.y,
                        this.cp1.x, this.cp1.y,
                        this.start.x, this.start.y);
      ctx.fillStyle = "tomato";
      ctx.closePath();
      ctx.fill();

    }
    this.normal = function(){
      // (-dy, dx)
      dy = this.end.y - this.start.y
      dx = this.end.x - this.start.x
      if(this.pointTest() < 0)
        return new Point(-dy, dx)
      else
        return new Point(dy, -dx);
    }
    this.midpoint = function(){
      _s = this.start
      _e = this.end
      dy = Math.abs(_e.y - _s.y)
      dx = Math.abs(_e.x - _s.x)
      midX = Math.min(_e.x, _s.x) + dx / 2
      midY = Math.min(_e.y, _s.y) + dy / 2
      return new Point(midX, midY)
    }
    this.pointTest = function(){
      // if return value negative point is on oneside
      // if positive point is on the other side
      _s = this.start
      _e = this.end
      _p = this.cp2

      return (_p.x - _s.x) * (_e.y - _s.y) - (_p.y - _s.y) * (_e.x - _s.x)
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
    console.log(_state.tmp.cp2)
    // _state.tmp.draw(ctx);
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

CanvasState.prototype.clear = function(ctx){
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

var CurveFromJSON = function(data){
  _curve = data;
  start = new Point(_curve.x1,_curve.y1)
  cp1 = new Point(_curve.x2,_curve.y2)
  cp2 = new Point(_curve.x3,_curve.y3)
  end = new Point(_curve.x4,_curve.y4)
  return new canvasState.curve(start, cp1, cp2, end);

}