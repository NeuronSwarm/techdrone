// content of index.js
const http = require('http')  
const port = 8080

const async = require('async');

app = require('./app')
app.set('port', port);


const server = http.createServer(app)

server.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})


// changes
