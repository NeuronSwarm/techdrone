var Point = function(x,y){
  if (arguments.length == 2) {
    this.x = x || 0;
    this.y = y || 0;
  } else {// Point(e)
    e = x; // e: Event
    this.x = e.clientX || 0;
    this.y = e.clientY || 0;
  }
}
Point.prototype.add = function(p){
  // Add point p to this point
  var tmpx = this.x + p.x;
  var tmpy = this.y + p.y;
  return new Point(tmpx, tmpy)
}
Point.prototype.minus = function(p){
  var tmpx = this.x - p.x;
  var tmpy = this.y - p.y;
  return new Point(tmpx, tmpy)
}

Point.prototype.multiply = function(scalar){
  return new Point(scalar*this.x, scalar*this.y);
}

Point.prototype.toString = function(){
  return '( ' + this.x + ', ' + this.y + ' )';
}