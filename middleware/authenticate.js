Account = require('../models/account.js')
Session = require('../models/session.js')

var localAuthentication = function(req, res, next){
  console.log('authenticating..');
  if(req.url == '/login' || req.url == '/register' || req.url == '/forgot'){
    return next();
  }
  if(!req.session){
    return res.send('session undefined, you are not authorized');
  }

  var my_cookie;
  if(req.headers.authorization)
    my_cookie = req.headers.authorization.split(',');
  else if(req.headers.my_cookie)
    my_cookie = req.headers.my_cookie.split(',');
  else if(req.body.my_cookie)
    my_cookie = req.body.my_cookie.split(',');
  else
    return res.status(401).send('no cookie data, you are not authorized')

  Session.findOne({secret: my_cookie[0]}, function(err,db_sesh){
    if(err)
      throw err;
    if(db_sesh){
      // measured in milli seconds expires in 1 hour
      if(db_sesh.updated_at - new Date > (60 * 60 * 1000))
        return res.status(401).send('expired session, plz login');

      Account.findOne({id: db_sesh.user_id}, function(err, user){
        if(err)
          throw err;
        if(user){
          req.user = user;
          next();
        }
        else
          return res.status(401).send('anonymous session, you are not authorized')
      });
    }
    else
      return res.status(401).send('no session on record, you are not authorized')
  });
}

module.exports = localAuthentication