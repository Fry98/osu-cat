module.exports = () => {
  if((window.innerWidth / 16) * 9 <= window.innerHeight){
    canv.width = window.innerWidth;
    canv.height = (window.innerWidth / 16) * 9;
  }
  else{
    canv.height = window.innerHeight;
    canv.width = (window.innerHeight / 9) * 16;
  }
  ctx.drawImage(images[14], 0, 0, 1280, 720, 0, 0, canv.width, canv.height);
  if (keyMap[config.taiko.cLeft]) {
    ctx.drawImage(images[15], 0, 0, 1280, 720, 0, 0, canv.width, canv.height);
  } else if (keyMap[config.taiko.rLeft]) {
    ctx.drawImage(images[17], 0, 0, 1280, 720, 0, 0, canv.width, canv.height);
  } else {
    ctx.drawImage(images[19], 0, 0, 1280, 720, 0, 0, canv.width, canv.height);
  }

  if (keyMap[config.taiko.cRight]) {
    ctx.drawImage(images[16], 0, 0, 1280, 720, 0, 0, canv.width, canv.height);
  } else if (keyMap[config.taiko.rRight]) {
    ctx.drawImage(images[18], 0, 0, 1280, 720, 0, 0, canv.width, canv.height);
  } else {
    ctx.drawImage(images[20], 0, 0, 1280, 720, 0, 0, canv.width, canv.height);
  }
};