(function() {
  var CanvasState, Schema, mongoose, autoIncrement;

  mongoose = require('mongoose');
  autoIncrement = require('mongoose-auto-increment');
  connection = mongoose
    .createConnection("mongodb://localhost/techdrone");
  autoIncrement.initialize(connection);
  Schema = mongoose.Schema;
  
  CanvasState = new Schema({
    created_at: Date,
    name: String,
    curves: [Number]
  });
  
  
  CanvasState.methods.getCurves = function(cb){
    Bezier.find({'id' : { $in : this.curves } }, function(err, curves){
      if(err)
        console.error(err)
      return cb(curves);
    })
  }
  CanvasState.plugin(autoIncrement.plugin, { model: 'Canvas', field: 'id' });
  module.exports = mongoose.model('Canvas', CanvasState);
}).call(this);