// Import section
import WebSocket, { WebSocketServer } from "ws";
import express from "express"
import { fileURLToPath } from "url";
import { dirname } from "path";
import easymidi from "easymidi";

// Manually define __dirname function as it was not available from the start
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Constants section
const web_app_port = 3000;
const ws_server_ip = "127.0.0.1";
const ws_server_port = 3061;
const midi_device_name = "ZQ-1";
const app = express();

// Define a base address for the starting page of the appplication
app.get("/", (req, res) => {
  res.sendFile("./web_app/index.html", { root: __dirname });
});

// Serve javascript pages of the application
app.use(express.static("web_app"));

// Start web server for frontend application
app.listen(web_app_port, () => console.log(`Your sequencer controller is available on port ${web_app_port}`));

// Starts a virtual MIDI device
var outputs = easymidi.getOutputs();
var output = new easymidi.Output(midi_device_name, true);

// Start a websocket server and listen to incoming messages
const wss = new WebSocketServer({ port: ws_server_port });
wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    var parse = JSON.parse(data);
    output.send(parse.args[0].value, {
      note: parse.args[1].value,
      velocity: parse.args[2].value,
      channel: parse.args[3].value
    });
  });
  ws.send("Connected to sequencer backend");
});