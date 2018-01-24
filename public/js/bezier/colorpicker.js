((exports) => {
  exports.ColorTool = () => {}
    var pickerCanvas = document.getElementById('picker');
    pickerCanvas.width  = $(pickerCanvas).width();
    pickerCanvas.height = $(pickerCanvas).height();
    var defaultColor = 'tomato'

    drawCircle = function(color, m_canvas){
      var ctx = pickerCanvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(m_canvas.width / 2, m_canvas.height / 2, 10, 0, Math.PI*2);
      ctx.fillStyle = color;
      ctx.fill()
      ctx.closePath();
    }

    $(document).ready(()=>{
      var localColor = localStorage.getItem('color')
      ColorTool.color = localColor ? localColor : defaultColor;
      drawCircle(ColorTool.color, pickerCanvas);

      $('#myColorPicker').colorpicker()
        .on('change', (e) => {
          ColorTool.color = e.target.value
          localStorage.setItem('color', ColorTool.color)
          drawCircle(ColorTool.color, pickerCanvas)
        })
    })
})(window)