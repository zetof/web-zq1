function Light({panel, group, x, y, size, color, onColor, offColor, caption}) {
  this.context = panel.getContext();
  this.group = group || null;
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
  this.on = false;
  this.caption = caption || "";
  this.lineWidth = 5;
  if(this.caption != ""){
    this.context.fillStyle = this.color.rgb();
    this.context.font = "14px monospace";
    this.context.textAlign = "center";
    this.context.textBaseline = "top";
    this.context.fillText(this.caption, this.x + this.size / 2, this.y + this.size + this.lineWidth);
  }
  this.draw();
}

Light.prototype.draw = function() {
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
  if(this.on) setTimeout(this.blink.bind(this), 100);
 }

 Light.prototype.blink = function() {
   this.on = !this.on;
   this.draw();
 }
