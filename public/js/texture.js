(function(exports){
  exports.Node = function(loc, children, siblings){
    _node = this;
    this.loc = loc;
    this.children = children || []
    this.siblings = siblings || []
  }
  Node.UP = 1;
  Node.DOWN = 0;
  Node.prototype.setChildren = function(a){
    // a, b is of the form { direction: 1 or 0, node: node }
    // theta of 1 is up
    // theta of 0 is down
    if(this.children.length < 2){
      a.forEach(function(node){
        _node.children.push(node)
      })
      return 1
    } else
      return 0
  }

  Node.prototype.hasSibling = function(){
    if(this.siblings.length > 0)
      return true;
    return false;
  }
  Node.prototype.setSiblings = function(a){
    if(this.siblings.length < 2){
      a.forEach(function(node){
        this.siblings.push(node)
      })
      return 1
    } else
      return 0
  }

  Node.prototype.lowerChild = function(){
    return this.children.filter(function( child ) {
      return child.direction == Node.DOWN;
    });
  }
  Node.prototype.upperChild = function(){
    return this.children.filter(function( child ) {
      return child.direction == Node.UP;
    });
  }
  Node.prototype.upperSibling = function(){
    return this.siblings.filter(function( sibling ) {
      return sibling.direction == Node.UP;
    });
  }
  Node.prototype.lowerSibling = function(){
    return this.siblings.filter(function( sibling ) {
      return sibling.direction == Node.DOWN;
    });
  }
  
  Node.prototype.findNearestChild = function(sibling){
    // assume it has children
    var tmp;
    if(sibling.direction == Node.UP)
      tmp = sibling.lowerChild()
    else
      tmp = sibling.upperChild()

    return tmp;
  }
  exports.Texture = function(ctx, root, opts){
    var self = this;
    ctx.font = "18px Arial";
    self.ctx = ctx
    self.root = root;
    self.r = opts.r
    self.theta = opts.theta
    self.nodes = [];
    
    var processNodes = function(nodes){
      var max = 0;
      nodes.forEach(function(node){
        if(node.x > max)
          max = node.x
      })
      return nodes.filter(function(node){
        return(node.x >= max - 1)
      })
    }
    var nodeInArea = function(node){
      var result = false;
      self.nodes.forEach(function(elem){
        if(Math.abs(elem.x - node.x) < 5 && Math.abs(elem.y - node.y) < 5){
          result = true
          return result;
        }
      })
      return result;
    }

    this.tree = function(root, r, theta){
      theta = theta - (.3 * Math.random())
      var roundtmp = new Point(Math.round(root.x), Math.round(root.y));
      // console.log(roundtmp);
      if( root.y < 0 || root.y > window.innerHeight || root.x > window.innerWidth){
        // console.log(root.toString());
        self.nodes.shift();
        return 0;
      }
      // ctx.fillText(roundtmp.toString(),root.x + 10,root.y);
      ctx.beginPath()
      var top = line(root, r, theta)
      var bottom = line(root, r, -theta)
      if(!nodeInArea(top))
        self.nodes.push(top);
      if(!nodeInArea(bottom));
        self.nodes.push(bottom);
      //console.log(root.toString());
      self.ctx.stroke();
      ctx.closePath()
      counter++;
      self.nodes.shift();
      return 1;
    }
    this.line = function(root, r, theta){
      ctx.moveTo(root.x, root.y)
      var tmpx = root.x + r * Math.cos(theta)
      var tmpy = root.y + r * Math.sin(theta)
      ctx.lineTo(tmpx, tmpy);
      return new Point(tmpx, tmpy)
    }
  }
  // Just create two children
  Texture.prototype.createChildren = function(parent){
    _texture = this;
    if(parent.children.length != 0)
      console.error('Parent already has children at: ' + parent.loc.toString())
    var children = [];
    for(var i = 0; i< 2; i++){
      children.push( { direction: i, node: _texture.createChild(parent, i) } )

    }

  }
  // When parent has siblings
  Texture.prototype.findOrCreateChildren = function(parent){
    var nodes = []
    if(this.HitBorder(parent)){
      console.log('Parent outside border: ' + parent.loc.toString())
      return
    }
    if(parent.children.length > 1){
      console.log('Parent already has children at: ' + parent.loc.toString())
      return
    }
    if(parent.hasSibling())
      parent.siblings.forEach(function(sibling){
        if(sibling.hasChild()){
          nodes.push(parent.findNearestChild(sibling))
        }
        else
          nodes.push(texture.createChild(sibling, sibling.direction))
      })
    else{
      // create two children
      nodes.push(parent.createChildren(parent))
    }

    // second time we are setting children
    if(!parent.setChildren(nodes)){
      console.error('Child not set at: ' + parent.loc.toString());
      return
    }
    // move sideways first
    if(parent.hasSiblingExpecting())
      this.findOrCreateChildren(parent.lowerChild());
    this.findOrCreateChildren(parent.lowerChild());
    return this.findOrCreateChildren(parent.upperChild());
  }
  Texture.prototype.HitBorder = function(node){
    var loc = node.loc
    if(loc.y < 0 || loc.y > window.innerHeight || loc.x > window.innerWidth)
      return true;
    return false;
  }
  // Ideal but not practical
  // Node.prototype.createChild = function(sibling){

  // }


  Texture.prototype.calcNode = function(parent, direction){
    var tmpTheta;
    if(Node.UP == direction)
      tmpTheta = this.theta;
    else
      tmpTheta = -this.theta;
    var tmpx = parent.x + this.r * Math.cos(tmpTheta)
    var tmpy = parent.y + this.r * Math.sin(tmpTheta)
    return new Point(tmpx, tmpy)
  }
  // Case where siblings do not have children
  Texture.prototype.createChild = function(parent, direction){
    var loc = this.calcNode(direction);
    var siblings = parent.children[0] || []
    var newChild = new Node(loc, [], siblings)
    parent.setChildren([{ direction: direction, node: newChild}])
    siblings.push(tmpChild)
    return newChild;
  }
})(window)