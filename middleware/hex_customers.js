const Account = require('../models/account.js')
const Session = require('../models/session.js')
const path = require('path')

// customer download frontend bundle as configurable function
var hexCustomer = function(req, res, next){
  console.log("access hex routes")
  console.log(req.url)
  if(req.url.length != 6 ) return next();
  else{
    var hexRex = new RegExp('^' + req.url.slice(1))
    Session.findOne({secret: hexRex}, (err, session) => {
      if(err) console.error(err)
      if(!session) return next()
      fs.readFile(path.join(__dirname, '../public/dist/bundle.js'), 'utf8', (err, file)=>{
        if(err) console.error(err)
        var api = 'createCoffeeWidget = (coffeeConfig) => {'
        api +=    `localStorage.setItem('session', '${session.secret}');\n${file}}`;
        return res.send(api);
      })
    })
  }
}

module.exports = hexCustomer