Account = require('../models/account.js')
Session = require('../models/session.js')

var accessControl = function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  return next();
}

module.exports = accessControl