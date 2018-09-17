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
  if (keyMap[87]) {
    ctx.drawImage(images[4], 0, 0, 1280, 720, 0, 0, canv.width, canv.height);
  } else if (keyMap[69]) {
    ctx.drawImage(images[4], 0, 0, 1280, 720, unit(50), unit(10), canv.width, canv.height);
  } else {
    ctx.drawImage(images[5], 0, 0, 1280, 720, unit(10), unit(3), canv.width, canv.height);
  }
};

function unit(point) {
  let unit = canv.width / 1280;
  return point*unit;
}