function Scale({base=36, scale, shift, steps}){
  this.base = base || 36;
  this.scale = scale || 0;
  this.shift = shift || 0;
  this.steps = steps || 51;
  this.scales = [
    ["CHROMATIC", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
    ["MAJOR", [0, 2, 4, 5, 7, 9, 11]],
    ["MELODIC MINOR", [0, 2, 3, 5, 7, 9, 11]],
    ["HARMONIC MINOR", [0, 2, 3, 5, 7, 8, 11]],
    ["AEOLIAN", [0, 2, 3, 5, 7, 8, 10]]
  ];
  this.setNotes();
}

Scale.prototype.setScale = function(type){
  this.type = type;
}

Scale.prototype.setNotes = function(){
  let scale = this.scales[this.scale][1];
  let scale_max = scale.length - 1;
  this.notes = [];
  let pointer = 0;
  let octave = 0;
  for(let i = 0; i < this.steps; i++){
    this.notes.push(this.base + this.shift + scale[pointer] + octave);
    if(pointer < scale_max) pointer++
    else {
      pointer = 0;
      octave += 12;
    }
  }
}

Scale.prototype.getNote = function(index){
  return this.notes[index];
}