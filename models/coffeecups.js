(function() {
  var CoffeeCups, Schema, mongoose, autoIncrement;

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
  
  
  CoffeeCups.statics.increment = function(cb){
    this.find({}, function(err, data){
      console.log('coffee count: ' + data[0].count)
      data[0].updated_at = new Date();
      data[0].count += 1;
      data[0].save(function(err){
        if(err) console.error(err);
        console.log('coffee incremented');
        cb();
      })
    })
  }
  CoffeeCups.statics.coffeeCount = function(cb){
    console.log('coffee start')
    this.find({}, function(err, data){
      console.log('coffee count: ' + data[0].count)
      var date = data[0].updated_at;
      var lastTime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
      return cb(data[0].count, lastTime);
    })
  }

  CoffeeCups.plugin(autoIncrement.plugin, { model: 'coffeecups', field: 'id' });
  module.exports = mongoose.model('coffeecups', CoffeeCups);
  
}).call(this);
  