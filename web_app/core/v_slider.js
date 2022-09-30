function Vslider({panel, group, eventsDispatcher, oscSender, oscLabel, x, y, width, height, color, onColor, offColor, min, max, decimal, val, caption}) {
  this.context = panel.getContext();
  this.group = group || null;
  this.oscSender = oscSender;
  this.oscLabel = oscLabel;
  this.x = x;
  this.y = y;
    if(group != null){
    this.x += this.group.getX();
    this.y += this.group.getY();
  }
  this.width = width || 30;
  this.height = height || 200;
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
  this.lineWidth = 5;
  this.knobWidth = 10;
  if(this.caption != ""){
    this.context.fillStyle = this.color.rgb();
    this.context.font = "14px monospace";
    this.context.textAlign = "center";
    this.context.textBaseline = "top";
    this.context.fillText(this.caption, this.x + this.width / 2, this.y + this.height + this.lineWidth);
  }
  downIndex = eventsDispatcher.addEvent(Event.MOUSE_DOWN, new Boundaries(Boundaries.RECT, this.x, this.y, this.width, this.height), this.setVal.bind(this));
  eventsDispatcher.addEvent(Event.MOUSE_MOVE, new Boundaries(Boundaries.RECT, this.x, this.y, this.width, this.height), this.setVal.bind(this), downIndex);
  eventsDispatcher.addEvent(Event.MOUSE_UP, new Boundaries(Boundaries.RECT, this.x, this.y, this.width, this.height), this.setVal.bind(this), downIndex);
  this.oscSender.send([this.oscLabel, this.val])
  this.draw();
}

Vslider.prototype.computePos = function() {
  return (this.val - this.min) / (this.max - this.min);
}

Vslider.prototype.computeVal = function() {
  val = this.min + this.pos * (this.max - this.min);
  if(this.decimal) val = 1 * val.toFixed(2);
  else val = 1 * Math.round(val);
  return val;
}

Vslider.prototype.setVal = function(val) {
  if(val >= this.min && val <= this.max) {
    if(this.decimal) this.val = 1 * val.toFixed(2);
    else this.val = 1 * Math.round(val);
    this.pos = this.computePos();
    this.draw();
  }
}

Vslider.prototype.draw = function(){
  if(this.group == null)
    this.context.clearRect(this.x - this.lineWidth, this.y - this.lineWidth, this.width + 2 * this.lineWidth, this.height + 2 * this.lineWidth);
  else {
    this.context.fillStyle = this.group.getBgColor().rgb();
    this.context.fillRect(this.x - this.lineWidth, this.y - this.lineWidth, this.width + 2 * this.lineWidth, this.height + 2 * this.lineWidth);
  }
  this.context.lineWidth = this.lineWidth;
  this.context.strokeStyle = this.color.rgb();
  this.context.fillStyle = this.val == this.max?this.onColor.rgb():this.offColor.rgb();
  this.context.beginPath();
  this.context.moveTo(this.x + this.width, this.y + this.width / 2);
  this.context.lineTo(this.x + this.width, this.y + this.height - this.width / 2);
  this.context.arc(this.x + this.width / 2, this.y + this.height - this.width / 2, this.width / 2, 0, -Math.PI);
  this.context.lineTo(this.x, this.y + this.width / 2);
  this.context.arc(this.x + this.width / 2, this.y + this.width / 2, this.width / 2, -Math.PI, 0);
  this.context.stroke();
  this.context.fill();
  this.context.fillStyle = this.val == this.min?this.offColor.rgb():this.onColor.rgb();
  this.context.beginPath();
  this.context.moveTo(this.x + this.width, this.y + this.width / 2 + (this.height - this.width) * (1 - this.pos));
  this.context.lineTo(this.x + this.width, this.y + this.height - this.width / 2);
  this.context.arc(this.x + this.width / 2, this.y + this.height - this.width / 2, this.width / 2, 0, - Math.PI);
  this.context.lineTo(this.x, this.y + this.width / 2 + (this.height - this.width) * (1 - this.pos));
  this.context.fill();
  this.context.fillStyle = this.color.rgb();
  this.context.beginPath();
  this.context.arc(this.x + this.width / 2, this.y + this.width / 2 + (this.height - this.width) * (1 - this.pos), this.width / 2 - 1, 0, 2 * Math.PI);
  this.context.fill();
  this.context.fillStyle = this.color.rgb();
  this.context.font = "10px monospace";
  this.context.textAlign = "center";
  this.context.textBaseline = "middle";
  this.context.fillText(this.val, this.x + this.width / 2, this.y + this.height / 2);  
}

Vslider.prototype.setVal = function(s, x, y){
  this.pos = 1 - (y - this.y - this.width / 2) / (this.height - this.width);
  if(this.pos < 0) this.pos = 0;
  if(this.pos > 1) this.pos = 1;
  val = this.computeVal();
  if(this.val != val) {
    this.val = val;
    this.oscSender.send([this.oscLabel, this.val])
  }
  this.draw();    
}