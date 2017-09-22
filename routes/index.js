express =  require('express');

nodemailer = require('nodemailer');

Newsletter = require('../models/newsletter');
fs = require('fs');

path = require('path');

router = express.Router();

router.get('/', function(req, res){
  return res.render('index', {});
  //res.send('Hello World');
});

router.post('/email/add', function(req, res){
  console.log('email is ' + req.body.email);
  Newsletter.add(req, res, function(err, message){
    if(err) return res.send(err);
    res.send(message);
  })

});

router.get('/email/send', function(req, res){
  Newsletter.send(req,res, function(err, info){
    if(err) return res.send(err);
    return res.send('Success!\n' + info.accepted + '\n' + info.response);
  })
})

router.get('/nonsense', function(req, res){
  res.render('nonsense', {});
});

router.get('/bezier', function(req, res){
  res.render('bezier', {});
});


module.exports = router