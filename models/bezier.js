(function() {
  var Bezier, Schema, mongoose;
  mongoose = require('mongoose');
  
  Schema = mongoose.Schema;
  
  Bezier = new Schema({
    id: Number,
    created_at: Date,
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number,
    x3: Number,
    y3: Number,
    x4: Number,
    y4: Number
  });
  
  
  Bezier.methods.serialize = function(curve, cb){
    self = this;
    self.id = 1;
    self.created_at = new Date();
    self.x1 = curve.start.x
    self.y1 = curve.start.y
    self.x2 = curve.cp1.x
    self.y2 = curve.cp1.y
    self.x3 = curve.cp2.x
    self.y3 = curve.cp2.y
    self.x4 = curve.end.x
    self.y4 = curve.end.y
    self.save(function(err){
      cb(err)
    })
  }
  module.exports = mongoose.model('bezier', Bezier);
  
}).call(this);
  