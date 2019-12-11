module.exports = function (RED) {
  function _create(config) {
	  RED.nodes.createNode(this, config);
	  const node = this;
	  node.on("input", function (msg, send, done) {
		  send = send || function() { node.send.apply(node,arguments) }

		  let commands = 'bp;arc;s'; // TEST

		  if (typeof msg.payload === "string") {
			  msg.payload += ';' + commands;
		  } else if (Array.isArray(msg.payload)) {
			  msg.payload.push(commands);
		  } else {
			  msg.payload = commands;
		  }
		  send(msg);
	  });
  }
  RED.nodes.registerType("rtk-board-face", _create);
}
