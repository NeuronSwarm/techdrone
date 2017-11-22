this.draw = function(root){
      ctx = self.ctx;
      var theta = 35 / ( 180 / Math.PI)
      var r = 20;
      root = root || self.root;
      self.nodes.push(root)
      ctx.strokeStyle = 'white';
      ctx.moveTo(root.x,root.y)
      // for(i = 0; i < 1000; i++){
      //   var tmpx = root.x + r * Math.cos(theta)
      //   var tmpy = root.y + r * Math.sin(theta)
      //   ctx.lineTo(tmpx, tmpy);
      //   root = new Point(tmpx, tmpy);
      //   theta = -theta;
        
      // }
      var counter = 0;
      while(self.nodes.length > 0){
        if(counter > 5000)
          break;
        if(counter % 10 == 0)
          self.nodes = processNodes(self.nodes)
        self.tree(root, r, theta)
        root = self.nodes[0];
        counter++;
        //Math.min(self.nodes.length - 1, Math.floor(10*Math.random()))
      }