Account = require('../models/account.js')
Session = require('../models/session.js')

var accessControl = function(req, res, next){
  console.log("access control middleware")
  if (req.method === 'OPTIONS') {
    var headers = {};
    // IE8 does not allow domains to be specified, just the *
    // headers["Access-Control-Allow-Origin"] = req.headers.origin;
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    headers["Access-Control-Allow-Headers"] = "my_cookie, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    res.writeHead(200, headers);
    return res.end();
  }
  res.header('Access-Control-Allow-Origin', '*');
  return next();
}

module.exports = accessControl