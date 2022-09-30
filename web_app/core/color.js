function Color(r, g, b, a=1) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
}

Color.prototype.rgb = function() {
  return "rgb(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
};

Color.prototype.alphaDown = function(delta) {
  return "rgb(" + this.r + "," + this.g + "," + this.b + "," + (this.a - delta) + ")";
};
