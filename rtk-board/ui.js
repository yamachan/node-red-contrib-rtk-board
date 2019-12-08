const path = require("path");
const socketio = require("socket.io");
const serveStatic = require("serve-static");

var inited = false;
var boardPath;
var io;

module.exports = function (RED) {
  if (!inited) {
    inited = true;
    init(RED.server, RED.httpNode || RED.httpAdmin, RED.log, RED.settings);
  }
  return { emit: emit, getPath: getPath };
}

//from: https://stackoverflow.com/a/28592528/3016654
function join() {
  const trimRegex = new RegExp("^\\/|\\/$", "g");
  const paths = Array.prototype.slice.call(arguments);
  return "/" + paths.map(function (e) { return e.replace(trimRegex, ""); }).filter(function (e) { return e; }).join("/");
}

function init(server, app, log, redSettings) {
	boardPath = join(redSettings.httpNodeRoot, "rtk-board");
	const socketIoPath = join(boardPath, "socket.io");
	const bodyParser = require("body-parser");

	app.use(bodyParser.json({ limit: "50mb" }));
	app.use(boardPath, serveStatic(path.join(__dirname, "dist")));

	io = socketio(server, { path: socketIoPath });
}

function emit(command, params) {
    io.emit(command, params);
}
function getPath() {
  return boardPath;
}
