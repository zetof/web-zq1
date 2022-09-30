function Group({panel, x, y, width, height, color, bgColor, caption}) {
  this.context = panel.getContext();
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color || new Color(255, 255, 255);
  this.bgColor = bgColor || new Color(31, 31, 31);
  this.caption = caption || "";
  this.lineWidth = 5;
  this.cornerSize = 10;
  this.draw();
}

Group.prototype.draw = function(){
  this.context.lineWidth = this.lineWidth;
  this.context.strokeStyle = this.color.rgb();
  this.context.fillStyle = this.bgColor.rgb();
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
    if(this.caption != ""){
    this.context.fillStyle = this.color.rgb();
    this.context.font = "16px monospace";
    this.context.textAlign = "center";
    this.context.textBaseline = "bottom";
    this.context.fillText(this.caption, this.x + this.width / 2, this.y - this.lineWidth);
  }
}

Group.prototype.getX = function(){
  return this.x;
}

Group.prototype.getY = function(){
  return this.y;
}

Group.prototype.getBgColor = function(){
  return this.bgColor;
}