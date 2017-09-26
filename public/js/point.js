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