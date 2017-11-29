Spectator = function () {
  self = this;
  // if user is running mozilla then use it's built-in WebSocket
  console.log('setting websockets');
  window.WebSocket = window.WebSocket || window.MozWebSocket;

  var connection = new WebSocket('ws://127.0.0.1:8080');

  connection.onopen = function () {
    // connection is opened and ready to use
    self.id = makeid();
    connection.send(JSON.stringify({type: 'spectator', id: self.id, data: 'hello Im a spectator!'}));
  };

  connection.onerror = function (error) {
    // an error occurred when sending/receiving data
  };

  connection.onmessage = function (message) {
    // try to decode json (I assume that each message
    // from server is json)
    console.log('spectator: ' + message);
    try {
      var json = JSON.parse(message.data);
    } catch (e) {
      console.log('This doesn\'t look like a valid JSON: ',
          message.data);
      return;
    }
    // handle incoming message
    // NOTE: if you're not sure about the JSON structure
    // check the server source code above
    // first response from the server with user's color
    console.log(json);
    console.log('spectator ' + self.id + ' received message');
    if(self.canvasState){
      canvasState.clear(tmpCTX);
      curve = canvasState.curveFromSocketJSON(json);
      if(json.permanent)
        curve.draw(self.ctx);
      else
        curve.draw(self.tmpCTX);
    }

  };
  connection.onclose = function(data){
    connection.send(JSON.stringify({type: 'specLeft', id: self.id, data: 'boy bye'}));
  }
  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 7; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
}

Spectator.prototype.addPlugin = function(plug, ctx, tmpCTX){
  this.canvasState = plug;
  this.ctx = ctx;
  this.tmpCTX = tmpCTX;
}
