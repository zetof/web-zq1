function Boundaries(type, x, y, p1, p2=0) {
  this.type = type;
  this.x = x;
  this.y = y;
  this.p1 = p1;
  this.p2 = p2;
}

Boundaries.CIRCLE = 0
Boundaries.RECT = 1

Boundaries.prototype.check = function(x, y){
  check = false
  switch(this.type) {
    case Boundaries.CIRCLE:
      if(((this.x + this.p1 / 2) - x) ** 2 + ((this.y + this.p1 / 2) - y) ** 2 < (this.p1 / 2) ** 2) check = true;
      break;
    case Boundaries.RECT:
      if(x > this.x && x < this.x + this.p1 && y > this.y && y < this.y + this.p2) check = true;
      break;
  }
  return check;
}