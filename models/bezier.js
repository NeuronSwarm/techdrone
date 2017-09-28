(function() {
  var Bezier, Schema, mongoose, autoIncrement;

  mongoose = require('mongoose');
  autoIncrement = require('mongoose-auto-increment');
  connection = mongoose
    .createConnection("mongodb://localhost/techdrone");
  autoIncrement.initialize(connection);
  Schema = mongoose.Schema;
  
  Bezier = new Schema({
    id: Number,
    state_id: Number,
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
      console.log(self.id);
      cb(err, self)
    })
  }
  Bezier.plugin(autoIncrement.plugin, { model: 'bezier', field: 'id' });
  module.exports = mongoose.model('bezier', Bezier);
  
}).call(this);
  