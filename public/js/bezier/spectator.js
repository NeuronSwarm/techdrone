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
      curve = CurveFromJSON(json, self.canvasState.curve);
      curve.draw(self.ctx);
    }

    /*
    if (json.type === 'color') { 
      myColor = json.data;
      status.text(myName + ': ').css('color', myColor);
      input.removeAttr('disabled').focus();
      // from now user can start sending messages
    } else if (json.type === 'history') { // entire message history
      // insert every single message to the chat window
      for (var i=0; i < json.data.length; i++) {
      addMessage(json.data[i].author, json.data[i].text,
          json.data[i].color, new Date(json.data[i].time));
      }
    } else if (json.type === 'message') { // it's a single message
      // let the user write another message
      input.removeAttr('disabled'); 
      addMessage(json.data.author, json.data.text,
                 json.data.color, new Date(json.data.time));
    } else {
      console.log('Hmm..., I\'ve never seen JSON like this:', json);
    }
    */
  };
  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 7; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
}

Spectator.prototype.addPlugin = function(plug, ctx){
  this.canvasState = plug;
  this.ctx = ctx;
}

var CurveFromJSON = function(data, curve){
  _curve = data.curve
  return new curve(_curve.start, _curve.cp1, _curve.cp2, _curve.end);
}