var ONE_DAY = 60 * 60 * 24 * 1000 // milliseconds
var tools = {

  daysFromJan: function(year = 2017){
    return Math.round(((new Date).getTime() - (new Date(2017, 0, 01)).getTime()) / ONE_DAY )
  }
}

module.exports = tools;