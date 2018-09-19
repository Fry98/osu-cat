function $(query){
  let el = document.querySelector(query);
  el.on = (event, callback)=>{
    return el.addEventListener(event, callback);
  };
  el.html = (data)=>{
    if(data === undefined){
      return el.innerHTML;
    }
    el.innerHTML = data;
  };
  el.css = (sel, val)=>{
    el.style[sel] = val;
  };
  el.val = (val)=>{
    el.value = val;
  };
  return el;
}