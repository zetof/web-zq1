function XYTrack({panel, group, eventsDispatcher, oscSender, oscLabel, x, y, size, color, offColor, min, max, decimal, val, caption}) {
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
  this.size = size || 150;
  this.color = color || new Color(255, 255, 255);
  this.offColor = offColor || new Color(63, 63, 63);
  this.min = min || [0, 0];
  this.max = max || [127, 127];
  this.decimal = decimal || false;
  this.val = val || [63, 63];
  if(this.decimal) this.val = [1 * this.val[0].toFixed(2), 1 * this.val[1].toFixed(2)];
  this.caption = caption || "";
  this.lineWidth = 5;
  this.thinLineWidth = 2;
  this.pointerSize = 5;
  this.cornerSize = 10;
  this.pos = this.computePos();
  if(this.caption != ""){
    this.context.fillStyle = this.color.rgb();
    this.context.font = "14px monospace";
    this.context.textAlign = "center";
    this.context.textBaseline = "top";
    this.context.fillText(this.caption, this.x + this.size / 2, this.y + this.size + this.lineWidth);
  }
  downIndex = eventsDispatcher.addEvent(Event.MOUSE_DOWN, new Boundaries(Boundaries.RECT, this.x, this.y, this.size, this.size), this.setVal.bind(this));
  eventsDispatcher.addEvent(Event.MOUSE_MOVE, new Boundaries(Boundaries.RECT, this.x, this.y, this.size, this.size), this.setVal.bind(this), downIndex);
  eventsDispatcher.addEvent(Event.MOUSE_UP, new Boundaries(Boundaries.RECT, this.x, this.y, this.size, this.size), this.setVal.bind(this), downIndex);
  this.oscSender.send([this.oscLabel, this.val[0], this.val[1]])
  this.draw();
}

XYTrack.prototype.computePos = function() {
  x = (this.val[0] - this.min[0]) / (this.max[0] - this.min[0]);
  y = (this.max[1] - this.val[1]) / (this.max[1] - this.min[1]);
  return [x, y];
}

XYTrack.prototype.computeVal = function() {
  valX = this.min[0] + this.pos[0] * (this.max[0] - this.min[0]);
  valY = this.max[1] - this.pos[1] * (this.max[1] - this.min[1]);
  if(this.decimal) {
    valX = 1 * valX.toFixed(2);
    valY = 1 * valY.toFixed(2);
  } 
  else {
    valX = Math.round(valX);
    valY = Math.round(valY);
  }
  return [valX, valY];
}

XYTrack.prototype.setVal = function(val) {
  if(val[0] >= this.min[0] && val[0] <= this.max[0] && val[1] >= this.min[1] && val[1] <= this.max[1]) {
    if(this.decimal) {
      valX = 1 * valX.toFixed(2) * 1;
      valY = 1 * valY.toFixed(2) * 1;
    } 
    else {
      valX = Math.round(valX);
      valY = Math.round(valY);
    }
    this.pos = this.computePos();
    this.draw();
  }
}

XYTrack.prototype.draw = function() {
  if(this.group == null)
    this.context.clearRect(this.x - this.lineWidth, this.y - this.lineWidth, this.size + 2 * this.lineWidth, this.size + 2 * this.lineWidth);
  else {
    this.context.fillStyle = this.group.getBgColor().rgb();
    this.context.fillRect(this.x - this.lineWidth, this.y - this.lineWidth, this.size + 2 * this.lineWidth, this.size + 2 * this.lineWidth);
  }
  this.context.lineWidth = this.lineWidth;
  this.context.strokeStyle = this.color.rgb();
  this.context.fillStyle = this.offColor.rgb();
  this.context.beginPath();
  this.context.moveTo(this.x + this.cornerSize, this.y);
  this.context.lineTo(this.x + this.size - this.cornerSize, this.y);
  this.context.arc(this.x + this.size - this.cornerSize, this.y + this.cornerSize, this.cornerSize, -Math.PI / 2, 0);
  this.context.lineTo(this.x + this.size, this.y + this.size - this.cornerSize);
  this.context.arc(this.x + this.size - this.cornerSize, this.y + this.size - this.cornerSize, this.cornerSize, 0, Math.PI / 2);
  this.context.lineTo(this.x + this.cornerSize, this.y + this.size);
  this.context.arc(this.x + this.cornerSize, this.y + this.size - this.cornerSize, this.cornerSize, Math.PI / 2, Math.PI);
  this.context.lineTo(this.x, this.y + this.cornerSize);
  this.context.arc(this.x + this.cornerSize, this.y + this.cornerSize, this.cornerSize, Math.PI, 3 * Math.PI / 2);
  this.context.stroke();
  this.context.fill();
  this.context.lineWidth = this.thinLineWidth;
  this.context.beginPath();
  x = this.x + this.cornerSize + (this.size - 2 * this.cornerSize) * this.pos[0];
  y = this.y + this.cornerSize + (this.size - 2 * this.cornerSize) * this.pos[1];
  this.context.moveTo(x, this.y);
  this.context.lineTo(x, this.y + this.size);
  this.context.stroke();
  this.context.beginPath();
  this.context.moveTo(this.x, y);
  this.context.lineTo(this.x + this.size, y);
  this.context.stroke();
  this.context.lineWidth = this.lineWidth;
  this.context.beginPath();
  this.context.arc(x, y, this.pointerSize, 0, 2 * Math.PI);
  this.context.stroke();
  this.context.fill();
}

XYTrack.prototype.setVal = function(s, x, y) {
  this.pos[0] = (x - this.x - this.cornerSize) / (this.size - 2 * this.cornerSize);
  this.pos[1] = (y - this.y - this.cornerSize) / (this.size - 2 * this.cornerSize);
  if(this.pos[0] < 0) this.pos[0] = 0;
  if(this.pos[0] > 1) this.pos[0] = 1;
  if(this.pos[1] < 0) this.pos[1] = 0;
  if(this.pos[1] > 1) this.pos[1] = 1;
  val = this.computeVal();
  if(this.val[0] != val[0] || this.val[1] != val[1]) {
    this.val = val;
    this.oscSender.send([this.oscLabel, this.val[0], this.val[1]])
  }
  this.draw();
}