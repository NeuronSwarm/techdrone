(function() {
  var Account, Schema, mongoose;
  mongoose = require('mongoose');
  
  Schema = mongoose.Schema;
  
  NewsLetter = new Schema({
    email: String,
    created_at: Date
  });
  
  NewsLetter.statics.add = function(req, res, cb){
    _email = req.body.email
    Newsletter.find({email: _email}, function(err, newsletter){
      if(newsletter.length){
        console.log(newsletter);
        return cb('Email already added', null);
      }
      else {
        newsletter = new Newsletter();
        newsletter.email = _email;
        newsletter.created_at = new Date();
        newsletter.save(function(err){
          cb(err, _email + ' saved successfully');
        });
      }
    });
  }
  var nodemailer = require('nodemailer')
  var mg = require('nodemailer-mailgun-transport')
  var auth = {
    auth: {
      api_key: 'key-ac5c436f177ccbc638224cb577553aae',
      domain: 'sandboxd07baec14c6f49db93b9cb79a7a86586.mailgun.org'
    }
  }
  var nodemailerMailgun = nodemailer.createTransport(mg(auth));

  NewsLetter.statics.send = function(req, res, cb){
    emails = [];
    Newsletter.find({}, function(err, newsletterList){
      newsletterList.forEach(function(newsletter){
        emails.push(newsletter.email);
      })
      console.log(emails);
      var mailOptions = {
        to: emails,
        from: 'newsletter@techdrone.com',
        subject: 'TechDrone NewsLetter',
        text: 'You are receiving an email'
      };
      nodemailerMailgun.sendMail(mailOptions, (err, info) => {
        if(err) console.error(err)
        console.log('Response: ' + info.accepted + '\n' + info.response);
        cb(err, info);
      });
    });
  }
  module.exports = mongoose.model('newsletter', NewsLetter);
  
}).call(this);
  