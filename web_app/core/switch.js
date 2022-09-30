function Switch({panel, group, eventsDispatcher, oscSender, oscLabel, x, y, width, height, color, onColor, offColor, val, caption, labels}) {
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
  this.width = width || 150;
  this.height = height || 40;
  this.color = color || new Color(255, 255, 255);
  this.onColor = onColor || new Color(190, 190, 190);
  this.offColor = offColor || new Color(63, 63, 63);
  this.val = val || 0;
  this.caption = caption || "";
  this.labels = labels || [];
  if(this.labels.length > 0){
    this.onColor = this.offColor;
    this.context.fillStyle = this.color.rgb();
    this.context.font = "14px monospace";
    this.context.textBaseline = "middle"
    this.context.textAlign = "right"
    this.context.fillText(this.labels[0], this.x - this.height / 2, this.y + this.height / 2);
    this.context.textAlign = "left"
    this.context.fillText(this.labels[1], this.x + this.width + this.height / 2, this.y + this.height / 2);
  }
  this.lineWidth = 5;
  if(this.caption != ""){
    this.context.fillStyle = this.color.rgb();
    this.context.font = "14px monospace";
    this.context.textAlign = "center"
    this.context.textBaseline = "top"
    this.context.fillText(this.caption, this.x + this.width / 2, this.y + this.height + this.lineWidth);
  }
  eventsDispatcher.addEvent(Event.MOUSE_DOWN, new Boundaries(Boundaries.RECT, this.x, this.y, this.width, this.height), this.switchState.bind(this))
  this.oscSender.send([this.oscLabel, this.val])
  this.draw();
}

Switch.prototype.draw = function(){
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
  this.context.moveTo(this.x + this.height / 2, this.y);
  this.context.lineTo(this.x + this.width - this.height / 2, this.y);
  this.context.arc(this.x + this.width - this.height / 2, this.y + this.height / 2, this.height / 2, -Math.PI / 2, Math.PI / 2);
  this.context.lineTo(this.x + this.height / 2, this.y + this.height);
  this.context.arc(this.x + this.height / 2, this.y + this.height / 2, this.height / 2, Math.PI / 2, -Math.PI / 2);
  this.context.stroke();
  this.context.fill();
  this.context.fillStyle = this.color.rgb();
  this.context.beginPath();
  if(this.val == 1)
    this.context.arc(this.x + this.width - this.height / 2, this.y + this.height / 2, this.height / 2 - 1, 0, 2 * Math.PI);
  else
    this.context.arc(this.x + this.height / 2, this.y + this.height / 2, this.height / 2 - 1, 0, 2 * Math.PI);
  this.context.fill();
}

Switch.prototype.switchState = function(s, x, y) {
  this.val = this.val == 1?0:1;
  this.oscSender.send([this.oscLabel, this.val])
  this.draw();
}

Switch.prototype.on = function() {
  this.val = 1;
  this.oscSender.send([this.oscLabel, this.val])
  this.draw();
}

Switch.prototype.off = function() {
  this.val = 0;
  this.oscSender.send([this.oscLabel, this.val])
  this.draw();
}