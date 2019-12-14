module.exports = function (RED) {
  function _create(config) {
	  RED.nodes.createNode(this, config);
	  const node = this;
	  this.conf = {};
      this.conf.face = config.face;
      this.conf.lwidth = config.lwidth;
	  this.conf.width = config.width;
	  this.conf.height = config.height;
      this.conf.left = config.left;
      this.conf.top = config.top;
      function _command_args(_a) {
          for (let l=0; l<_a.length; l++) {
              _a[l] = !!_a[l] ? _a[l] : '_';
          }
          return _a;
      }
      function _command_list(_c) {
          return (Array.isArray(_c) ? _c.join(';') : '' + _c).split(/\s*;\s*/);
      }
      function _msg_join(_v, _c) {
          return typeof _v === 'string' ? _v + ';' + _c : Array.isArray(_v) ? _v.concat(_c) : _c;
      }
	  node.on("input", function (msg, send, done) {
		  send = send || function() { node.send.apply(node,arguments) }

          let list = _command_list(msg.payload);
          let last = list.pop();
		  let command = 'face ' + last + ' ' + _command_args([
              this.conf.face, this.conf.width, this.conf.height, this.conf.left, this.conf.top, this.conf.lwidth
          ]).join(' ');
          msg.payload = _msg_join(list, command);
		  send(msg);
	  });
  }
  RED.nodes.registerType("rtk-board-face", _create);
}
