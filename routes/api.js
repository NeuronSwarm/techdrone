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

// Updated 12/12
router.get('/coffee/days', function(req, res){
  DrinkingDays.getLast(req, 10, function(data){
    // coffeeCups: Array
    // user: String
    var params = {
      coffeeCups: data.counts,
      user: req.user.username
    }
    return res.send(params)
  })
})
router.get('/coffee/index', function(req, res){
  console.log('before count')
  CoffeeCups.coffeeCount(req, res, function(data){
    var params = {
      coffeeCups: data.count,
      updated_at: data.updatedAt,
      user: req.user.username
    }
    return res.send(params);
  })
})


module.exports = router