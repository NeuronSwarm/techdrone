(function() {
  var DrinkingDays, Schema, mongoose, autoIncrement;

  mongoose = require('mongoose');
  autoIncrement = require('mongoose-auto-increment');
  DateTools = require('../lib/date_tools');

  connection = mongoose
    .createConnection("mongodb://localhost/techdrone");
  Schema = mongoose.Schema;

  
  DrinkingDays = new Schema({
    day: Number,
    cup_ids: [Number],
    user_id: Number,
    updated_at: Date

  });
  
  
  var saveCup = function(cup, drinkDay, cb){
    cup.drinkday_id = drinkDay.id;
    cup.save(function(err){
      if(err) return console.error(err)
      return drinkDay.add(cup, cb);
    })
  }
  DrinkingDays.statics.getLast = function(req, nDays, cb){
    var today = DateTools.daysFromJan()
    var days = [];
    var counts = []
    for(var i = 0; i < nDays; i++){
      var newRecord = {day:today-i, count:0}
      counts.push(newRecord)
      days.push(today - i)
    }
    this.find({user_id: req.user.id, day: days}, function(err, data){
      if(err) { console.error(err); return cb({error: err}) }

      data.forEach((drinkingDay) => {
        counts.forEach((record)=>{
          if(record.day == drinkingDay.day)
            record.count = drinkingDay.coffeeCount()
        })
      })
      cb({counts: counts})
    })
  }

  DrinkingDays.statics.upsert = function(user, cb){
    _drinkDays = this
    var cup = new CoffeeCups({created_at: new Date, count: 1})
    var today = DateTools.daysFromJan()

    this.findOne({user_id: user.id, day: today}, function(err, drink){
      if(drink){
        drink.updated_at = new Date()
        drink.save((err) => {
          if(err) return console.error(err)
          return saveCup(cup, drink, cb)
        })
      }
      else {
        m_drink = new _drinkDays({day: today, user_id: user.id, updated_at: new Date})
        m_drink.save(function(err){
          if(err) return console.error(err)
          return saveCup(cup, m_drink, cb)
        })
      }
      

    })
  }
  DrinkingDays.methods.add = function(cup, cb){
    _drink= this
    this.cup_ids.push(cup.id)
    this.save(function(err){
      if(err) console.error(err);
      console.log('coffee added to day ' + _drink.day);
      cb();
    })
  }
  // UnNeeded method
  DrinkingDays.methods.coffeeCount = function(cb){
    return this.cup_ids.length;
  }

  DrinkingDays.plugin(autoIncrement.plugin, { model: 'drinking_days', field: 'id' });
  module.exports = mongoose.model('drinking_days', DrinkingDays);
  
}).call(this);
  