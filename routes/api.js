express =  require('express');

Account = require('../models/account.js')
Session = require('../models/session.js')
async = require('async');
forEach = require('async-foreach').forEach;
CoffeeCups = require('../models/coffeecups');
DrinkingDays = require('../models/drinking_days');
Bezier = require('../models/bezier');
DateTools = require('../lib/date_tools');
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

router.post('/coffee/update', function(req, res){
  DrinkingDays.upsert(req.user, function(){
    return res.send('coffee incremented');
  })
})

// Total Cups drank this year
router.get('/coffee/year', function(req, res){

  var days = DateTools.daysFromJan((new Date).getFullYear())
  DrinkingDays.getLast(req, days, function(data){
    // coffeeCups: Array
    // user: String
    var totals = data.counts.reduce((total, record) => {return total + record.count}, 0)
    var params = {
      coffeeCups: totals,
      user: req.user.username
    }
    return res.send(params)
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
      updatedAt: data.updatedAt,
      user: req.user.username
    }
    return res.send(params);
  })
})


module.exports = router