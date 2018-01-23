$(document).ready(() => {
  // toolbar event handlers
  $('.collapser.left').on('click', (e) => {
    $('#left-panel').hide() 
  })

  $('.collapser.right').on('click', (e) => {
    $('#left-panel').show() 
  })

  $('.tool.disk').on('click', (e) => {
    $('#left-panel').show() 
  })

  var tmpState = { curves: []}
  $('.tool.undo').on('click', (e) => {
    if(canvasState.curves.length > 0){
      var curveToUndo = canvasState.curves.pop();
      tmpState.curves.push(curveToUndo)
      canvasState.clear(ctx);
      canvasState.render(ctx);
    }
  })

  $('.tool.redo').on('click', (e) => {
    if(tmpState.curves.length > 0){
      var tmpCurve = tmpState.curves.pop()
      tmpCurve.draw(ctx)
    }
  })

  $('.tool.color').on('click', (e) => {
    $('.tool-explain').text('Hex color picker coming soon..').show()
  })

  // hover events
  var toolHandlerOut = (e) => {
    $('.tool-explain').hide()
  }

  $('.tool.disk').hover((e) => {
      $('.tool-explain').text('Save & load canvas').show()
    }, toolHandlerOut)

  $('.tool.undo').hover((e) => {
      $('.tool-explain').text('Undo curve').show()
    }, toolHandlerOut)

  $('.tool.redo').hover((e) => {
      $('.tool-explain').text('Redo curve').show()
    }, toolHandlerOut)

  $('.tool.color').hover((e) => {
      $('.tool-explain').text('Change color on next curve').show()
    }, toolHandlerOut)

})