var MIN_DOMAIN = 200
var MAX_DOMAIN = 1200
var ctx1 = setup()

var smallPI = Math.PI / 100
var F =  function(x,t){
  var fx = 10* Math.sin((x-t) * smallPI ) + 140 + 10*Math.cos((x-t) * smallPI)
  return fx
}
var G =  function(x){
  var fx = Math.pow(x, 2) + 100
  if(x < -10 || x > 10) return 200
  return fx
}


const draw = function(x, f, t){
  // console.log('x: ', x, ' y: ', f(x))
  ctx1.lineTo(2*x + 300 + t, f(x));
}
drawWave = (t) => {
  ctx1.moveTo(200, 200)
  for(var i = -40; i < MAX_TIME; i++){
    draw(i , G, t)
  }
}

STOP = false
var MIN_TIME = 0
const MAX_TIME = 40

ctx1.beginPath();
ctx1.moveTo(0,0);
time = -20 
let timer  = setInterval(() => {
  Clear(ctx1)
  ctx1.beginPath()
  drawWave(time)
  ctx1.lineTo(800,200)
  ctx1.stroke()
  ctx1.closePath()

  time = time + 1
  if(STOP)
    clearInterval(timer)
}, 50)
// loop(MIN_TIME)


function setup(){
  var canvas = document.getElementById('canvas');
  ctx1= canvas.getContext("2d")
  ctx1.strokeStyle = 'white'
  var listener = setInterval(() => {
    ctx1.strokeStyle = ColorTool.color
  }, 1000)
  setTimeout(() => clearInterval(listener), 30000)
  return ctx1
}

function Clear(ctx){
  ctx.clearRect(0, 0, 1000, 1000);
}
var loop = function(i){
  Clear(ctx1)
  drawWave(i)
  setTimeout(() => { 
    if(i < MAX_TIME)
      loop(i + 1)
    }, 5000)
}