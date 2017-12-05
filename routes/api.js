express =  require('express');

Account = require('../models/account.js')
Session = require('../models/session.js')
async = require('async');
forEach = require('async-foreach').forEach;
CoffeeCups = require('../models/coffeecups');
DrinkingDays = require('../models/drinking_days');
Bezier = require('../models/bezier');
fs = require('fs');
path = require('path');

router = express.Router();

router.get('/', function(req, res){
  return res.send({user: req.user.username});
  //res.send('Hello World');
});

router.post('/coffee/create', function(req, res){
  c = new CoffeeCups()
  c.created_at = c.updated_at = new Date();
  c.count = 0;
  c.save(function(err){
    if(err) console.error(err);
    return res.send('saved');
  })
})

router.get('/coffee/dashboard', function(req, res){
  return res.render('coffee/dashboard');
})

router.post('/coffee/update', function(req, res){
  DrinkingDays.upsert(req.user, function(){
    res.header('Access-Control-Allow-Origin', '*');
    return res.send('coffee incremented');
  })
})

router.get('/coffee/index', function(req, res){
  console.log('before count')
  CoffeeCups.coffeeCount(function(count, timeDrank){
    return res.send({coffeeCups: count, time: timeDrank });
  })
})


module.exports = router