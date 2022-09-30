function Led({panel, group, eventsDispatcher, x, y, width, height, cornerSize, color, onColor, offColor, val, caption}) {
  this.context = panel.getContext();
  this.group = group || null;
  this.x = x;
  this.y = y;
    if(group != null){
    this.x += this.group.getX();
    this.y += this.group.getY();
  }
  this.width = width || 30;
  this.height = height || 15;
  this.color = color || new Color(255, 255, 255);
  this.onColor = onColor || new Color(190, 190, 190);
  this.offColor = offColor || new Color(63, 63, 63);
  this.val = val || 0;
  this.caption = caption || "";
  this.lineWidth = 1;
  this.cornerSize = cornerSize || 3;
  if(this.caption != ""){
    this.context.fillStyle = this.color.rgb();
    this.context.font = "12px monospace";
    this.context.textAlign = "left";
    this.context.textBaseline = "center";
    this.context.fillText(this.caption, this.x + this.width + 4 * this.lineWidth, this.y + this.height / 2);
  }
  this.draw();
}

Led.prototype.draw = function(){
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

Led.prototype.on = function() {
  this.val = 1;
  this.draw();
}

Led.prototype.off = function() {
  this.val = 0;
  this.draw();
}