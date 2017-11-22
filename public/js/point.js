var Point = function(x,y){
  if (arguments.length == 2) {
    this.x = x || 0;
    this.y = y || 0;
  } else {// Point(e)
    e = x; // e: Event
    this.x = e.clientX - 9 || 0;
    this.y = e.clientY - 10 || 0;
  }
}
Point.prototype.add = function(p){
  // Add point p to this point
  var tmpx = this.x + p.x;
  var tmpy = this.y + p.y;
  return new Point(tmpx, tmpy)
}

Point.prototype.toString = function(){
  return '( ' + this.x + ', ' + this.y + ' )';
}