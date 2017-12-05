(function() {
  var Account, Schema, mongoose, passportLocalMongoose;
  var autoIncrement = require('mongoose-auto-increment');
  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  passportLocalMongoose = require('passport-local-mongoose');

  var connection = mongoose
    .createConnection("mongodb://localhost/techdrone");
  autoIncrement.initialize(connection);

  Account = new Schema({
    email: String,
    username: String,
    password: String,
    created_at: Date,
    resetPasswordToken: String,
    resetPasswordExpiration: Date
  });
  Account.plugin(autoIncrement.plugin, { model: 'accounts', field: 'id' });
  Account.plugin(passportLocalMongoose);

  module.exports = mongoose.model('accounts', Account);

}).call(this);