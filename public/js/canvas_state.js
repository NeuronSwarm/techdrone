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
    _state.tmp = this;

    var distance = function(vec1, vec2){
      return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2))
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
      //_tmp = mid.add(_curve.normal().multiply(scale))
      //var outerCurveObj = _t = _state.DrawMethods.quadraticBezier({begin: this.end, mid: _tmp, end: this.start})
      var _t = {cp1: this.cp2.add(mid.minus(this.cp2).multiply(0.5)), cp2: this.cp1.add(mid.minus(this.cp1).multiply(0.5)), end: this.start}
      //console.log(outerCurveObj)
      ctx.bezierCurveTo(_t.cp1.x, _t.cp1.y,
                        _t.cp2.x, _t.cp2.y,
                        _t.end.x, _t.end.y);
      ctx.fillStyle = "tomato";
      ctx.fill();
      ctx.closePath();

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
      _curve = _state.curveFromJSON(curveData)
      _state.curves.push(_curve)
      _curve.draw(ctx);
    })
  }
}

CanvasState.prototype.clear = function(ctx){
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}
CanvasState.prototype.addPlugin = function(plug){
  this.DrawMethods = plug;
}

CanvasState.prototype.curveFromJSON = function(data){
  _curve = data;
  var
    start = new Point(_curve.x1,_curve.y1),
    cp1 = new Point(_curve.x2,_curve.y2),
    cp2 = new Point(_curve.x3,_curve.y3),
    end = new Point(_curve.x4,_curve.y4)
  return new canvasState.curve(start, cp1, cp2, end);
}

CanvasState.prototype.curveFromSocketJSON = function(data){
  _curve = data.curve
  var
    start = new Point(_curve.start.x,_curve.start.y),
    cp1 = new Point(_curve.cp1.x,_curve.cp1.y),
    cp2 = new Point(_curve.cp2.x,_curve.cp2.y),
    end = new Point(_curve.end.x,_curve.end.y)
  return new canvasState.curve(start, cp1, cp2, end);
}