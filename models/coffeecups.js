(function() {
  var CoffeeCups, DrinkingDays, Schema, mongoose, autoIncrement;

  DateTools = require('../lib/date_tools');
  DrinkingDays = require('./drinking_days');
  autoIncrement = require('mongoose-auto-increment');
  mongoose = require('mongoose');
  connection = mongoose
    .createConnection("mongodb://localhost/techdrone");
  Schema = mongoose.Schema;
  
  CoffeeCups = new Schema({
    created_at: Date,
    count: Number,
    drinkday_id: Number
  });
  
  
  // TYPE: admin or user
  // TODO Implement God view
  // Today only
  CoffeeCups.statics.coffeeCount = function(req, res, cb){
    var today = DateTools.daysFromJan();
    var params = {day: today, user_id: req.user.id }
    DrinkingDays.findOne(params, function(err, data){
      if(err) { console.error(err); return cb({error: err}) }
      if(!data) return cb({count: 0, updatedAt: '--'})
      var date = data.updated_at;
      var lastTime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
      return cb({count: data.coffeeCount(), updatedAt: lastTime});
    })
  }

  CoffeeCups.plugin(autoIncrement.plugin, { model: 'coffeecups', field: 'id' });
  module.exports = mongoose.model('coffeecups', CoffeeCups);
  
}).call(this);
  