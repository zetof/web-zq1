function Metronome(bpm=60, running=false){
  this.bmp = bpm || 60;
  this.timer = null;
  if(running) this.start();
  this.alive = true;
}

Metronome.prototype.start = function(){
  this.running = true;
}

Metronome.prototype.stop = function(){
  this.running = false;
}

Metronome.prototype.isAlive = function(){
  return this.alive;
}

Metronome.prototype.exit = function(){
  this.alive = false;
}