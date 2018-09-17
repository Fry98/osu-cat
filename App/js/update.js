const { screen } = require('electron');

module.exports = ()=>{
  const mousePos = screen.getCursorScreenPoint();
  const currentDisp = screen.getDisplayNearestPoint(mousePos).workAreaSize;
  if (mousePos.x > (currentDisp.width / 2)) {
    if (mousePos.y > (currentDisp.height / 2)) {
      mouseArea = 2;
    } else {
      mouseArea = 1;
    }
  } else {
    if (mousePos.y > (currentDisp.height / 2)) {
      mouseArea = 3;
    } else {
      mouseArea = 0;
    }
  }
};