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

// params ex /:user/coffee
// query ex /coffee?user=ty
router.get('/:user_id/days', function(req, res){
  var _req = {user: { id: req.params.user_id}}
  Account.findOne({id: _req.user.id}, (err, user) => {
    if(!user) return res.status(400).send("no user")
    DrinkingDays.getLast(_req, 10, function(data){
      // coffeeCups: Array
      // user: String

      var params = {
        coffeeCups: data.counts,
        user: user.username
      }
      return res.send(params)
    })
  })
})

router.get('/user/index', (req, res) => {
  Account.find({}, (err, users) => {
    var params = []
    users.forEach((user)=> {
      params.push({ username: user.username, id: user.id })
    })
    return res.send(params)
  })
})

router.get('/:user_id/index', function(req, res){
  var _req = {user: { id: req.params.user_id}}
  Account.findOne({id: _req.user.id}, (err, user) => {
    CoffeeCups.coffeeCount(_req, res, function(data){
      var params = {
        coffeeCups: data.count,
        updatedAt: data.updatedAt,
        user: user.username
      }
      return res.send(params);
    })
  })
})
// Total Cups drank this year
router.get('/:user_id/year', function(req, res){

  var _req = {user: { id: req.params.user_id}}
  Account.findOne({id: _req.user.id}, (err, user) => {
    var days = DateTools.daysFromJan((new Date).getFullYear())
    DrinkingDays.getLast(_req, days, function(data){
      // coffeeCups: Array
      // user: String
      var totals = data.counts.reduce((total, record) => {return total + record.count}, 0)
      var params = {
        coffeeCups: totals,
        user: user.username
      }
      return res.send(params)
    })
  })
})


module.exports = router