function EventsDispatcher(panel) {
  
  // Get canvas and its properties
  canvas = panel.getCanvas();
  rect = canvas.getBoundingClientRect();

  // Setup class properties
  this.context = canvas.getContext("2d");
  this.left = rect.left;
  this.top = rect.top;
  this.moveEvent = -1;
  this.upEvent = -1;
  this.eventsArray = [];

  // Setup mouse events
  canvas.addEventListener("mousedown", this.dispatchMouseDownEvents.bind(this), false);
  canvas.addEventListener("mousemove", this.dispatchMouseMoveEvents.bind(this), false);
  canvas.addEventListener("mouseup", this.dispatchMouseUpEvents.bind(this), false);
  canvas.addEventListener("mouseout", this.lostFocus.bind(this), false);
  canvas.addEventListener("touchstart", this.dispatchMouseDownEvents.bind(this), false);
  canvas.addEventListener("touchmove", this.dispatchMouseMoveEvents.bind(this), false);
  canvas.addEventListener("touchend", this.dispatchMouseUpEvents.bind(this), false);
  canvas.addEventListener("touchcancel", this.lostFocus.bind(this), false); 
}

EventsDispatcher.prototype.addEvent = function(eventType, boundaries, callback, downEvent=-1) {
  this.eventsArray.push(new Event(eventType, boundaries, callback));
  eventIndex = this.eventsArray.length - 1;
  if(downEvent >= 0)
    this.eventsArray[downEvent].linkEvent(eventType, eventIndex)
  return eventIndex;
}

EventsDispatcher.prototype.resetEvents = function() {
  this.eventsArray = [];
}

EventsDispatcher.prototype.dispatchMouseDownEvents = function(e) {
  if(e.type == "touchstart") {
    e.preventDefault();
    x = Math.round(e.changedTouches[0].clientX) - this.left;
    y = Math.round(e.changedTouches[0].clientY) - this.top;
  }
  else {
    x = e.clientX - this.left;
    y = e.clientY - this.top;
  }
  for(i = 0; i < this.eventsArray.length; i++)
    if(this.eventsArray[i].eventType == Event.MOUSE_DOWN)
      if(this.eventsArray[i].boundaries.check(x, y)) {
        this.moveEvent = this.eventsArray[i].moveEvent;
        this.upEvent = this.eventsArray[i].upEvent;
        this.eventsArray[i].callback(1, x, y - this.top);
        break;
      }
}

EventsDispatcher.prototype.dispatchMouseMoveEvents = function(e) {
  if(e.type == "touchmove") {
    e.preventDefault();
    x = Math.round(e.changedTouches[0].clientX) - this.left;
    y = Math.round(e.changedTouches[0].clientY) - this.top;
  }
  else {
    x = e.clientX - this.left;
    y = e.clientY - this.top;
  }
  if(this.moveEvent >= 0) {
    canvas.style.cursor = "pointer";
    this.eventsArray[this.moveEvent].callback(1, x, y);
  }
  else {
    isPointer = false;
    for(i = 0; i < this.eventsArray.length; i++)
      if(this.eventsArray[i].boundaries.check(x, y)) {
        isPointer = true;
        break;
      }
    canvas.style.cursor = isPointer?"pointer":"default";
  }
}

EventsDispatcher.prototype.dispatchMouseUpEvents = function(e) {
  if(e.type == "touchend") {
    e.preventDefault();
    clientX = Math.round(e.changedTouches[0].clientX);
    clientY = Math.round(e.changedTouches[0].clientY);
  }
  else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  if(this.upEvent >= 0) {
    this.eventsArray[this.upEvent].callback(0, clientX - this.left, clientY - this.top);
    this.moveEvent = -1;
    this.upEvent = -1;
  }
}

EventsDispatcher.prototype.lostFocus = function(e) {
  this.moveEvent = -1;
  this.upEvent = -1;
}