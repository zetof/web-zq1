function Event(eventType, boundaries, callback) {
  this.eventType = eventType;
  this.boundaries = boundaries;
  this.callback = callback;
  this.moveEvent = -1;
  this.upEvent = -1;
}

Event.MOUSE_DOWN = 0
Event.MOUSE_UP = 1
Event.MOUSE_MOVE = 2

Event.prototype.linkEvent = function(eventType, event) {
  if(this.eventType == Event.MOUSE_DOWN)
  	if(eventType == Event.MOUSE_MOVE)
  	  this.moveEvent = event;
  	else if(eventType == Event.MOUSE_UP)
  	  this.upEvent = event;	
};