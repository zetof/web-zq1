function Panel(color) {
  if(typeof color === "undefined") {
    color = new Color(0, 0, 0);
  }
  canvas = document.createElement('canvas');
  canvas.style.backgroundColor = color.rgb();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
}

Panel.prototype.getCanvas = function() {
  return this.canvas;
}

Panel.prototype.getContext = function() {
  return this.context;
}

Panel.prototype.getWidth = function() {
  return this.canvas.width;
}

Panel.prototype.getHeight = function() {
  return this.canvas.height;
}