module.exports = function (RED) {
	function _create(config) {
		RED.nodes.createNode(this, config);
		this.conf = {};
		this.conf.type = config.btype;
		this.conf.width = config.width;
		this.conf.height = config.height;
	}
	RED.nodes.registerType("rtk-board-config", _create);
}
