module.exports = function (RED) {
  const ui = require("./ui.js")(RED);
  function _create(config) {
	  RED.nodes.createNode(this, config);
	  const node = this;
	  const board = RED.nodes.getNode(config.board);
	  node.on("input", function (msg) {
		  if (board && board.conf) {
			  ui.emit("rtk-output", [msg.payload, board.conf]);
		  }
	  });
  }
  RED.nodes.registerType("rtk-board-output", _create);
}
