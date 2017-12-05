(function() {
  var DrinkingDays, Schema, mongoose, autoIncrement;

  mongoose = require('mongoose');
  autoIncrement = require('mongoose-auto-increment');
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
  DrinkingDays.statics.upsert = function(user, cb){
    _drinkDays = this;
    var cup = new CoffeeCups({created_at: new Date, count: 1})
    
    this.find({user_id: user.id}, function(err, drinks){
      var oneDay = 24*60*60*1000;
      var daysFromJan = Math.round(((new Date).getTime() - (new Date(2017, 0, 01)).getTime()) / oneDay )
      m_drink = drinks.map(function(drink){
        if(drink.day == daysFromJan) return drink
      })
      m_drink = m_drink[0]
      if(m_drink){
        return saveCup(cup, m_drink, cb)
      }
      else {
        m_drink = new _drinkDays({day: daysFromJan, user_id: user.id, updated_at: new Date})
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
  DrinkingDays.methods.coffeeCount = function(cb){
    CoffeeCups.find({id: this.cup_ids}, function(err, cups){
      var sum = 0;
      cups.map(function(cup){
        sum += cup.count
      })
      return cb(sum);
    })
  }

  DrinkingDays.plugin(autoIncrement.plugin, { model: 'drinking_days', field: 'id' });
  module.exports = mongoose.model('drinking_days', DrinkingDays);
  
}).call(this);
  