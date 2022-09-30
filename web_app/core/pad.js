function Pad({panel, group, eventsDispatcher, callback, x, y, width, height, mode, color, onColor, offColor, val, caption}){
  this.context = panel.getContext();
  this.group = group || null;
  this.callback = callback || null;
  this.x = x;
  this.y = y;
    if(group != null){
    this.x += this.group.getX();
    this.y += this.group.getY();
  }
  this.width = width || 50;
  this.height = height || 25;
  this.color = color || new Color(255, 255, 255);
  this.onColor = onColor || new Color(190, 190, 190);
  this.offColor = offColor || new Color(63, 63, 63);
  this.val = val || 0;
  this.caption = caption || "";
  this.lineWidth = 3;
  this.cornerSize = 5;
  if(this.caption != ""){
    this.context.fillStyle = this.color.rgb();
    this.context.font = "12px monospace";
    this.context.textAlign = "center";
    this.context.textBaseline = "top";
    this.context.fillText(this.caption, this.x + this.width / 2, this.y + this.height + this.lineWidth);
  }
  mode = mode || 0;
  if(mode == 0){
    eventsDispatcher.addEvent(Event.MOUSE_DOWN, new Boundaries(Boundaries.RECT, this.x, this.y, this.width, this.height), this.switchState.bind(this));
  }
  else{
    downIndex = eventsDispatcher.addEvent(Event.MOUSE_DOWN, new Boundaries(Boundaries.RECT, this.x, this.y, this.width, this.height), this.flipFlop.bind(this));
    eventsDispatcher.addEvent(Event.MOUSE_UP, new Boundaries(Boundaries.RECT, this.x, this.y, this.width, this.height), this.flipFlop.bind(this), downIndex);
  }
  this.draw();
}

Pad.prototype.draw = function(){
  if(this.group == null)
    this.context.clearRect(this.x - this.lineWidth, this.y - this.lineWidth, this.width + 2 * this.lineWidth, this.height + 2 * this.lineWidth);
  else {
    this.context.fillStyle = this.group.getBgColor().rgb();
    this.context.fillRect(this.x - this.lineWidth, this.y - this.lineWidth, this.width + 2 * this.lineWidth, this.height + 2 * this.lineWidth);
  }
  this.context.lineWidth = this.lineWidth;
  this.context.strokeStyle = this.color.rgb();
  this.context.fillStyle = this.val == 1?this.onColor.rgb():this.offColor.rgb();
  this.context.beginPath();
  this.context.moveTo(this.x + this.cornerSize, this.y);
  this.context.lineTo(this.x + this.width - this.cornerSize, this.y);
  this.context.arc(this.x + this.width - this.cornerSize, this.y + this.cornerSize, this.cornerSize, -Math.PI / 2, 0);
  this.context.lineTo(this.x + this.width, this.y + this.height - this.cornerSize);
  this.context.arc(this.x + this.width - this.cornerSize, this.y + this.height - this.cornerSize, this.cornerSize, 0, Math.PI / 2);
  this.context.lineTo(this.x + this.cornerSize, this.y + this.height);
  this.context.arc(this.x + this.cornerSize, this.y + this.height - this.cornerSize, this.cornerSize, Math.PI / 2, Math.PI);
  this.context.lineTo(this.x, this.y + this.cornerSize);
  this.context.arc(this.x + this.cornerSize, this.y + this.cornerSize, this.cornerSize, Math.PI, 3 * Math.PI / 2);
  this.context.stroke();
  this.context.fill();
}

Pad.prototype.flipFlop = function(s, x, y){
  this.val = s;
  if(this.callback) this.callback(this.val);
  this.draw();
}

Pad.prototype.switchState = function(s, x, y) {
  this.val = (this.val == 1)?0:1;
  if(this.callback) this.callback(this.val);
  this.draw();
}

Pad.prototype.getVal = function() {
  return this.val;
}

Pad.prototype.on = function() {
  this.val = 1;
  if(this.callback) this.callback(this.val);
  this.draw();
}

Pad.prototype.off = function() {
  this.val = 0;
  if(this.callback) this.callback(this.val);
  this.draw();
}