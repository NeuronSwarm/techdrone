(function(exports){
  exports.Crosshair = function(center, angle){
    this.center = center;
    this.angle = angle;
    this.color = '#44484f';
    this.r = 15;
  }
  Crosshair.prototype.draw = function(ctx){
    _cross = this;
    ctx.lineWidth = 5;
    ctx.strokeStyle = _cross.color;
    interval = 1/24 * Math.PI
    for(var i = 0; i < 8; i++){
      var y = 6*i
      ctx.beginPath();
      ctx.arc(_cross.center.x, _cross.center.y, _cross.r, (interval*y) + _cross.angle, (interval*(y+3)) + _cross.angle);
      ctx.stroke();
      ctx.closePath();
    }
  }
  Crosshair.prototype.toggleColor = function(){
    if(this.color == '44484f')
      return this.color = '#3d4859'
    else if(this.color == '#3d4859'){
      return this.color = '#4c5460'
    }
    else if(this.color == '#4c5460'){
      return this.color = '#687b99'
    }
    else{
      return this.color = '44484f'

    }
  }

  Crosshair.prototype.toggleRadius = function(){
    if(this.r == 15)
      this.r = 13;
    else if(this.r == 13)
      this.r = 11;
    else if(this.r == 11)
      this.r = 9;
    else if(this.r == 9)
      this.r = 10;
    else if(this.r == 10)
      this.r = 12;
    else if(this.r == 12)
      this.r = 14;
    else
      this.r = 15;
  }
})(window)