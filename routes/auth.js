express =  require('express');

nodemailer = require('nodemailer');
Account = require('../models/account.js')
Session = require('../models/session.js')
passport = require('passport')

async = require('async');
forEach = require('async-foreach').forEach;
fs = require('fs');
path = require('path');

router = express.Router();

router.post('/login', passport.authenticate('local', {
  failureFlash: false
}), function(req, res, next) {
  Session.findOne({user_id: req.user.id}, function(err, session){
    if(err)
      console.error(err);
    if(!session){
      console.error('this should never happen')
    }
    return session.saveSesh(req.session.id, req.user, res);
  });
});

router.post('/register', function(req, res, next) {
  username = req.body.username;
  password = req.body.password;
  email = req.body.email;
  console.log(`user: ${username}`);
  if(!username || !password || !email){
    req.session.destroy();
    //res.clearCookie('connect.sid');
    return res.status(400).send('missing field data').end();
  }
    // User by that name already exists
    // if(user)
    //   return res.status(400).send(`user by name: ${user.username} already taken`).end();

  return Account.register(new Account({
    username: username,
    email: email,
    created_at: new Date
  }), req.body.password, function(err, account) {
    if (err) {
      return res.status(400).send(err.message);
    }
    return passport.authenticate('local')(req, res, function() {
      // req.session.cookie.maxAge = 3600000;
      // do not duplicate in db sessions
      // need to be async
      console.log('req session: ' + req.session)
      session = new Session();
      session.created_at = new Date;
      session.saveSesh(req.session.id, req.user, res);
    });
  });
});

module.exports = router