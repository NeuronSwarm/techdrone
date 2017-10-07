express =  require('express');

nodemailer = require('nodemailer');

async = require('async');
forEach = require('async-foreach').forEach;
Newsletter = require('../models/newsletter');
const Canvas = require('../models/canvas_state')
Bezier = require('../models/bezier');
fs = require('fs');
path = require('path');

router = express.Router();

router.get('/', function(req, res){
  return res.render('index', {});
  //res.send('Hello World');
});

router.post('/email/add', function(req, res){
  console.log('email is ' + req.body.email);
  Newsletter.add(req, res, function(err, message){
    if(err) return res.send(err);
    res.send(message);
  })

});

router.get('/email/send', function(req, res){
  Newsletter.send(req,res, function(err, info){
    if(err) return res.send(err);
    return res.send('Success!\n' + info.accepted + '\n' + info.response);
  })
})

router.get('/nonsense', function(req, res){
  res.render('nonsense', {});
});

router.get('/bezier', function(req, res){
  res.render('bezier', {});
});

router.get('/proto', function(req, res){
  res.render('OnTour/proto', {});
});

router.get('/canvas/index', function(req, res){
  Canvas.find({}, function(err, _states){
    if(err)
      console.error(err);
    res.send({list: _states});
  })
})
router.get('/bezier/load/:id', function(req, res){
  Canvas.findOne({id: req.params.id}, function(err, _state){
    if(err)
      console.error(err);
    _state.getCurves(function(curves){
      res.send({canvas_state: curves});
    })
  })
});
router.post('/bezier/save', function(req, res){
  if(req.body.canvas_state ==  null)
    return res.status(400).send({err: 'No curve data'});
  
  // serialize all curves to canvas_state
  var curves = []; 
  var _name = req.body.name;
  forEach(req.body.canvas_state, function(_item){
    var done = this.async();
    bezier = new Bezier();
    bezier.serialize(_item.curve, function(err, curve){
      if(err){
        console.log(err)
        return res.status(500).send(err);
      }
      console.log('bezier id: ' + curve.id);
      curves.push(curve.id);
      done();
    })
  }, function(){
    canvas = new Canvas();
    canvas.name = _name; 
    canvas.curves = curves;
    canvas.save(function(err){
      if(err)
        console.error(err);
      return res.send('ok');
    });
  })
});


module.exports = router