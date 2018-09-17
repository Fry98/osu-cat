module.exports = ()=>{
  if((window.innerWidth / 16) * 9 <= window.innerHeight){
    canv.width = window.innerWidth;
    canv.height = (window.innerWidth / 16) * 9;
  }
  else{
    canv.height = window.innerHeight;
    canv.width = (window.innerHeight / 9) * 16;
  }
  ctx.drawImage(images[mouseArea], 0, 0, 1280, 720, 0, 0, canv.width, canv.height);
  if (keyMap[config.leftClick]) {
    ctx.drawImage(images[6], 0, 0, 1280, 720, 0, 0, canv.width, canv.height);
  } else if (keyMap[config.rightClick]) {
    ctx.drawImage(images[6], 0, 0, 1280, 720, unit(20), unit(10), canv.width, canv.height);
  } else {
    ctx.drawImage(images[7], 0, 0, 1280, 720, unit(10), 0, canv.width, canv.height);
  }
};

function unit(point) {
  let unit = canv.width / 640;
  return point*unit;
}