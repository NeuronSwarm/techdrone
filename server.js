// content of index.js
const http = require('http')  
const WebSocketServer = require('websocket').server;
const port = 8080

const async = require('async');

app = require('./app')
app.set('port', port);


const server = http.createServer(app)
var spectators = [];
var clients = [];

server.listen(port, 'localhost', (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

wsServer = new WebSocketServer({
  httpServer: server
});

wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    console.log(message.type)
    if (message.type === 'utf8') {
      // console.log(message.utf8Data);
      
      // connection.sendUTF(JSON.stringify({ data: 'shutup client'} ))
      var obj = JSON.parse(message.utf8Data);
      if(obj.type == 'spectator'){
        console.log('new spectator joined')
        spectators.push({connection: connection, id: obj.id})

        clients.forEach(function(client){
          client.connection.sendUTF(JSON.stringify({id: obj.id, type: 'specAdded'}))
        })
        return;
      }
      if(obj.type == 'bezier'){
        clients.push({connection: connection, id: obj.id });
      }
      if(obj.type == 'specLeft'){
        console.log('Spectator Left');
        return;
      }
      if(obj.curve){
        spectators.forEach(function(spectator){
          spectator.connection.sendUTF(JSON.stringify(obj));
        })
      }
      else {
        // console.log('message type: ' + obj.type)
        // console.log('message id: ' + obj.id)
        console.log('message data: ' + obj.data)
      }
      // back to spectator client
      // find all spectator clients and send them curve data based on id
      // connection.sendUTF(JSON.stringify(obj));

    } else if(message.type == 'CloseEvent')
      console.log('Spectator Left')
  });

  connection.on('close', function() {
    // close user connection
    //console.log(connection.id)
  });
});


// changes
