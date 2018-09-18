module.exports = ()=>{
  const mousePos = screen.getCursorScreenPoint();
  const currentDisp = screen.getPrimaryDisplay().size;
  if (mousePos.x < (currentDisp.width / 3)) {    
    upOrDown(0, 3);
  } else if (mousePos.x < ((currentDisp.width / 3)) * 2) {
    upOrDown(1, 2);
  } else {
    upOrDown(4, 5);
  }

  function upOrDown(upArea, downArea) {
    if (mousePos.y < (currentDisp.height / 2)) {
      mouseArea = upArea;
    } else {
      mouseArea = downArea;
    }
    if (config.mouse) {
      mouseArea += 6;
    }
  }
};