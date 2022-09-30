function Midi(baseUrl="127.0.0.1", basePort=3061){
	this.baseUrl = baseUrl;
	this.basePort = basePort;
	this.ws = new WebSocket("ws://" + this.baseUrl + ":" + this.basePort);
	this.pending = [];
	this.dispatcher = [];
	this.ws.onopen = this.wsOK.bind(this);
	this.ws.onerror = this.wsKO.bind(this);
	this.ws.onclose = function(event) {
  	console.log("WebSocket is closed now.");
	}
}

Midi.prototype.wsOK = function(data) {
  while(this.pending.length > 0) this.send(this.pending.pop());
}

Midi.prototype.wsKO = function(data) {
  alert("Problem connecting to websocket server 'ws://" + this.baseUrl + ":" + this.basePort + "'. No OSC messages will be sent until you start the server and refresh this page.");
}

Midi.prototype.send = function(data) {
  if(this.ws.readyState !== 1) this.pending.push(data)
  else {
  	formattedData = [];
  	data.forEach(function(value) {
  		valueType = typeof value;
  		if(valueType == "string") type = "s";
  		else if(valueType == "number") type = "f";
      formattedData.push({ "type": type, "value": value });
  	})
	  msg = { args:formattedData };
	  this.ws.send(JSON.stringify(msg));
  }
}