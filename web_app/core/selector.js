function Selector({panel, group, eventsDispatcher, callback, x, y, size, color, onColor, offColor, array, index, caption}) {
  this.context = panel.getContext();
  this.group = group || null;
  this.callback = callback || null;
  this.x = x;
  this.y = y;
    if(group != null){
    this.x += this.group.getX();
    this.y += this.group.getY();
  }
  this.size = size || 80;
  this.color = color || new Color(255, 255, 255);
  this.onColor = onColor || new Color(190, 190, 190);
  this.offColor = offColor || new Color(63, 63, 63);
  this.array = array || [0, 1];
  this.index = index || 0;
  if(this.decimal) this.val = this.val.toFixed(2);
  this.caption = caption || "";
  this.lineWidth = 5;
  this.selectorWidth = 10;
  if(this.caption != ""){
    this.context.fillStyle = this.color.rgb();
    this.context.font = "12px monospace";
    this.context.textAlign = "center";
    this.context.textBaseline = "top";
    this.context.fillText(this.caption, this.x + this.size / 2, this.y + this.size + this.lineWidth);
  }
  downIndex = eventsDispatcher.addEvent(Event.MOUSE_DOWN, new Boundaries(Boundaries.CIRCLE, this.x, this.y, this.size), this.select.bind(this));
  this.draw();
}

Selector.prototype.getIndex = function() {
  return this.index;
}

Selector.prototype.setIndex = function(index) {
  if(index >= 0 && index < this.array.length) {
    this.index = index;
    if(this.callback) this.callback(this.index);
    this.draw();
  }
}

Selector.prototype.draw = function() {
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
  this.context.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, 2 * Math.PI);
  this.context.stroke();
  this.context.fill();
  this.context.lineWidth = this.selectorWidth - 4;
  this.context.strokeStyle = this.onColor.rgb();
  angle = - 11 * Math.PI / 8;
  angleInc = 14 * Math.PI / (8 * this.array.length);
  for(i = 0; i < this.array.length; i++) {
    i == this.index?this.context.strokeStyle = this.onColor.rgb():this.context.strokeStyle = this.color.rgb();
    this.context.beginPath();
    this.context.arc(this.x + this.size / 2 , this.y + this.size / 2, (this.size - this.selectorWidth) / 2, angle + i * angleInc + 0.1, angle + (i + 1) * angleInc - 0.1);
    this.context.stroke();
  }
  this.context.fillStyle = this.color.rgb();
  this.context.font = "12px monospace";
  this.context.textAlign = "center";
  this.context.textBaseline = "middle";
  this.context.fillText(this.array[this.index], this.x + this.size / 2, this.y + this.size / 2);  
}

Selector.prototype.select = function(s, x, y) {
  index = this.index;
  deltaX = (x - this.x - this.size / 2);
  if(deltaX < 0 && this.index > 0) index--;
  else if(deltaX > 0 && this.index < this.array.length - 1) index++;
  if(index != this.index) {
    this.index = index;
    if(this.callback) this.callback(this.index);
    this.draw();        
  }
}