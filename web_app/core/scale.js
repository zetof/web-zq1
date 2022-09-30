function Scale(base=36, scale=0, shift=0, steps=50){
  this.base = base || 36;
  this.scale = scale || 0;
  this.shift = shift || 0;
  this.steps = steps || 51;
  this.scales = [
    ["CHROMATIC", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
    ["MAJOR", [0, 2, 4, 5, 7, 9, 11]],
    ["MELODIC MINOR", [0, 2, 3, 5, 7, 9, 11]],
    ["HARMONIC MINOR", [0, 2, 3, 5, 7, 8, 11]],
    ["MAJOR PENTATONIC", [0, 2, 4, 7, 9]],
    ["MINOR PENTATONIC", [0, 3, 5, 7, 10]],
    ["AEOLIAN", [0, 2, 3, 5, 7, 8, 10]],
    ["SPANISH", [0, 1, 4, 5, 7, 8, 10]],
    ["CHINESE", [0, 4, 6, 7, 11]]
  ];
  this.setNotes();
}

Scale.prototype.setScale = function(scale){
  this.scale = scale;
  this.setNotes();
}

Scale.prototype.setShift = function(shift){
  this.shift = shift;
  this.setNotes();
}

Scale.prototype.setNotes = function(){
  let scale = this.scales[this.scale][1];
  let scale_max = scale.length - 1;
  this.notes = [];
  let pointer = 0;
  let octave = 0;
  for(let i = 0; i <= this.steps; i++){
    this.notes.push(this.base + this.shift + scale[pointer] + octave);
    if(i - octave == scale[pointer]){
      if(pointer < scale_max) pointer++
      else {
        pointer = 0;
        octave += 12;
      }
    }
  }
}

Scale.prototype.getNote = function(index){
  return this.notes[index];
}

Scale.prototype.getScaleNames = function(index){
  let scale_names = [];
  this.scales.forEach(element => scale_names.push(element[0]));
  return scale_names;

}