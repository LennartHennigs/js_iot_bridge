// ---------------------------------------------------
// JSLint settings
/*global $, $axure, WebSocket, window, console, alert */
/*exported toHardware */
/*jslint devel: true */
/*jslint es6: true*/ 
/*eslint-disable no-console */
// ---------------------------------------------------

var ws;
// Chrome doesn't allow unsecure websocket (ws) connections to localhost / 127.0.0.1
var SERVER = 'ws://192.168.42.1:1880';
var DEBUG = false;

// ---------------------------------------------------

$(document).ready(function() {
  console.log("page loaded");
});

// ---------------------------------------------------
// PUBLIC FUNCTION FOR AXURE

function toHardware(id, msg) {
  "use strict";
  var obj = {
    'topic': id,
    'payload': msg
  };
  console.log("sent: ");
  console.log(obj);
  
  ws.send(JSON.stringify(obj));
}

// ---------------------------------------------------
// setup websocket connection

if (window.WebSocket !== 'undefined') {
  ws = new WebSocket(SERVER);
  
  ws.onopen = () => {
    if (DEBUG) {
      alert("Connected to server!");
    }
    console.log('Connected to server!');
// !!    ws.send("connected");
  };

  ws.onerror = (error) => {
    "use strict";
    console.log('error: ' + error);
  };

  ws.onclose = () => {
    "use strict";
    console.log('Connection closed!');
  };

  ws.onmessage = (event) => {
    "use strict";
    var msg = JSON.parse(event.data);
    console.log("received: ");
    console.log(msg);
    $axure("@" + msg.topic).text(msg.payload);
    $axure("@" + msg.topic).moveBy(0, 0);
  };

} else {
  alert("websockets are not supported");
}

// ---------------------------------------------------
/*eslint-enable no-console */

