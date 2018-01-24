var Client = function () {
  self = this;
  // if user is running mozilla then use it's built-in WebSocket
  console.log('setting websockets');
  window.WebSocket = window.WebSocket || window.MozWebSocket;

  var connection;
  if(location.host == 'techdrone.us')
    connection = new WebSocket('wss://techdrone.us');
  else
    connection = new WebSocket('ws://127.0.0.1:8080');
  self.connection = connection;

  connection.onopen = function () {
    // connection is opened and ready to use

    self.id = makeid();
    connection.send(JSON.stringify({id: self.id, data: 'hello server', type: 'bezier'}));
  };

  connection.onerror = function (error) {
    // an error occurred when sending/receiving data
  };

  connection.onmessage = function (message) {
    // try to decode json (I assume that each message
    // from server is json)
    try {
      var json = JSON.parse(message.data);
    } catch (e) {
      console.log('This doesn\'t look like a valid JSON: ',
          message.data);
      return;
    }
    if(json.type == 'specAdded'){
      self.onSpectatorAdded(json)
    }

    // handle incoming message
    // NOTE: if you're not sure about the JSON structure
    // check the server source code above
    // first response from the server with user's color

  };
  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 7; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
}

Client.prototype.send = function(data){
  this.connection.send(data);
}
Client.prototype.onSpectatorAdded = function(data){
  $('.viewers').trigger('specAdded', [data]);
}

