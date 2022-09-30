function Knob({panel, group, eventsDispatcher, callback, x, y, size, color, onColor, offColor, min, max, decimal, val, caption}) {
  this.context = panel.getContext();
  this.group = group || null;
  this.callback = callback || null;
  this.x = x;
  this.y = y;
    if(group != null){
    this.x += this.group.getX();
    this.y += this.group.getY();
  }
  this.size = size || 40;
  this.color = color || new Color(255, 255, 255);
  this.onColor = onColor || new Color(190, 190, 190);
  this.offColor = offColor || new Color(63, 63, 63);
  this.min = min || 0;
  this.max = max || 127;
  this.decimal = decimal || false;
  this.val = val || 0;
  if(this.decimal) this.val = 1 * this.val.toFixed(2);
  this.pos = this.computePos();
  this.caption = caption || "";
  this.lineWidth = 3;
  this.knobWidth = 10;
  this.mouseY = y;
  this.on = false;
  if(this.caption != ""){
    this.context.fillStyle = this.color.rgb();
    this.context.font = "12px monospace";
    this.context.textAlign = "center";
    this.context.textBaseline = "top";
    this.context.fillText(this.caption, this.x + this.size / 2, this.y + this.size + this.lineWidth);
  }
  downIndex = eventsDispatcher.addEvent(Event.MOUSE_DOWN, new Boundaries(Boundaries.CIRCLE, this.x, this.y, this.size), this.setBase.bind(this));
  eventsDispatcher.addEvent(Event.MOUSE_MOVE, new Boundaries(Boundaries.CIRCLE, this.x, this.y, this.size), this.changeVal.bind(this), downIndex);
  eventsDispatcher.addEvent(Event.MOUSE_UP, new Boundaries(Boundaries.CIRCLE, this.x, this.y, this.size), this.resetBase.bind(this), downIndex);
  this.draw();
}

Knob.prototype.computePos = function() {
  return (this.val - this.min) / (this.max - this.min);
}

Knob.prototype.computeVal = function() {
  val = this.min + this.pos * (this.max - this.min);
  if(this.decimal) val = 1 * val.toFixed(2);
  else val = 1 * Math.round(val);
  return val;
}

Knob.prototype.getVal = function() {
  return this.val;
}

Knob.prototype.setVal = function(val) {
  if(val >= this.min && val <= this.max && val != this.val) {
    if(this.decimal) this.val = 1 * val.toFixed(2);
    else this.val = 1 * Math.round(val);
    this.pos = this.computePos();
    if(this.callback) this.callback(this.val);
    this.draw();
  }
}

Knob.prototype.draw = function(blink){
  if(this.group == null)
    this.context.clearRect(this.x - this.lineWidth, this.y - this.lineWidth, this.size + 2 * this.lineWidth, this.size + 2 * this.lineWidth);
  else {
    this.context.fillStyle = this.group.getBgColor().rgb();
    this.context.fillRect(this.x - this.lineWidth, this.y - this.lineWidth, this.size + 2 * this.lineWidth, this.size + 2 * this.lineWidth);
  }
  this.context.lineWidth = this.lineWidth;
  this.context.strokeStyle = this.color.rgb();
  this.context.fillStyle = this.on?this.onColor.rgb():this.offColor.rgb();
  this.context.beginPath();
  this.context.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, 2 * Math.PI);
  this.context.stroke();
  this.context.fill();
  angle = - 11 * Math.PI / 8 + 14 * this.pos * Math.PI / 8;
  this.context.lineWidth = this.knobWidth;
  this.context.strokeStyle = this.color.rgb();
  this.context.beginPath();
  this.context.arc(this.x + this.size / 2 , this.y + this.size / 2, (this.size - this.knobWidth) / 2, angle - 0.1, angle + 0.1);
  this.context.stroke();
  this.context.fillStyle = this.color.rgb();
  this.context.font = "10px monospace";
  this.context.textAlign = "center";
  this.context.textBaseline = "middle";
  this.context.fillText(this.val, this.x + this.size / 2, this.y + this.size / 2);  
  if(blink && this.on) setTimeout(this.blink.bind(this), 50);
}

Knob.prototype.setBase = function(s, x, y){
  this.mouseY = y;
}

Knob.prototype.changeVal = function(s, x, y){
  deltaY = (this.mouseY - y) / 100;
  this.mouseY = y;
  this.pos += deltaY;
  if(this.pos < 0) this.pos = 0;
  if(this.pos > 1) this.pos = 1;
  val = this.computeVal();
  if(this.val != val) {
    this.val = val;
    if(this.callback) this.callback(this.val);
    this.draw(false);    
  }
}

Knob.prototype.resetBase = function(s, x, y){
  this.mouseY = this.y;
}

Knob.prototype.blink = function() {
  this.on = !this.on;
  this.draw(true);
}