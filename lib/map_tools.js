const Canvas = require('../models/canvas_state')

GetNonNamedMap = (cb) => {
  Canvas.findOne({name: '404'}, function(err, _state){
    if(err)
      console.error(err);
    if(!_state) return 'fail'
    _state.getCurves((curves) => {
      return cb(curves)
    })
  })
}

module.exports = GetNonNamedMap;