$(function () {
	const socket = io({ path: "/rtk-board/socket.io" });
	const target = document.getElementById('rtk-board-canvas');
	if (!socket || !target) {
		console.log("rtk-board: init fail");
		return;
	}

	socket.on("error", function (err) {
		console.log("error", err);
	})

	var context = target.getContext('2d');
	var param = {};
	function b_init() {
		param = {};
		param._color = conf.type === 'wb' ? 'black' : conf.type === 'bb' ? 'white' : 'rgba(255,255,255,0.85)';
		param._width = 5;
		param._line_cap = 'butt';
		param._x = 0; param._y = 0;
		param._w = 50; param._h = 50;
		param._r = 50;
		param._sa = param._ra = 0; param._ea = 2; // radian
		param._rand_bound = 2;
		param._text = '',
		param._text_font = '30px serif';
		param._face_type = 'rf';
		param._face_mode = 'smile';

		param.T = true; param.F = false;
		param.sb_white = 'rgba(255,255,255,0.85)';
		param.sb_yellow = 'rgba(255,255,146,0.85)';
		param.sb_red = 'rgba(247,171,173,0.85)';
		param.sb_blue = 'rgba(126,203,220,0.85)';
	}
	function _conv(_v, _default, _base) {
		var $ = param;
		_v = !_v || _v === '_' ? _default : _v.match(/^\$\(.+\)$/) ? eval(_v.substring(1)) : _v.match(/^\$\w+$/) ? param[_v.substring(1)] : _v;
		if (typeof _v === 'string') {
			_v = _base && _v.match(/^-?[0-9.]+%$/) ? _base * Number(_v.substring(0,_v.length - 1)) / 100 : _v.match(/^-?[0-9.]+$/) ? Number(_v) : _v;
		}
		return _v;
	}
	function b_cls(_c) {
		var c = _c ? _c : conf.type === 'wb' ? 'white' : conf.type === 'bb' ? 'black' : '#1d543f';
		$(target).css("width", conf.width + "px").css("height", conf.height + "px").css("backgroundColor", c);
		context.clearRect(0, 0, target.width, target.height);
	}
	function check_step(_v) {
		return typeof _v === 'number' && !Number.isNaN(_v) && !!_v && typeof _v === 'number' ? _v : 0;
	}
	function _rand(_bound) {
		return Math.floor(Math.random() * Math.floor(_bound));
	}

	var inited = false;
	var conf;
	socket.on("rtk-output", function (_o) {
		conf = _o[1];
		if (!inited) {
			b_init();
			b_cls();
			inited = true;
		}
		var que = (Array.isArray(_o[0]) ? _o[0].join(';') : '' + _o[0]).split(/\s*;\s*/);
		//console.log("rtk-output: ", JSON.stringify(que));
		let wait_count = 0;
		let labels = {};
		for (var l=0; l<que.length; l++) {
			q = que[l].replace(/(^\s+)|(\s+$)/g, '').split(/\s+/);
			if (q[0].startsWith('#')) {
				labels[q[0]] = l - 1;
			}
		}
		for (var l=0; l<que.length; l++) {
			q = que[l].replace(/(^\s+)|(\s+$)/g, '').split(/\s+/);
			if (q.length > 0) {
				switch (q[0]) {
					case 'init':
						b_init();
						break;
					case 'cls':
						b_cls(_conv(q[1]));
						break;
					case 'c':
					case 'color':
						context.fillStyle = param._color = _conv(q[1], 'black');
						break;
					case 'cRand':
					case 'colorRand':
						context.fillStyle = param._color = '#' + _rand(256).toString(16) + _rand(256).toString(16) + _rand(256).toString(16);
						break;
					case 'w':
					case 'width':
						context.lineWidth = param._width = _conv(q[1], 10);
						break;
					case 'g':
					case 'go':
					case 'goTo':
						param._x = Number(_conv(q[1], param._x, conf.width));
						param._y = Number(_conv(q[2], param._y, conf.height));
						context.moveTo(param._x, param._y);
						break;
					case 'gRand':
					case 'goRand':
					case 'goToRand':
						param._x = _rand(conf.width);
						param._y = _rand(conf.height);
						context.moveTo(param._x, param._y);
						break;
					case 'm':
					case 'move':
					case 'moveTo':
						param._x += Number(_conv(q[1], param._x, conf.width));
						param._y += Number(_conv(q[2], param._y, conf.height));
						context.moveTo(param._x, param._y);
						break;
					case 'sr':
					case 'rect':
					case 'strokeRect':
						param._w = _conv(q[1], param._w, conf.width); param._h = _conv(q[2], param._h, conf.height);
						param._x = _conv(q[3], param._x, conf.width); param._y = _conv(q[4], param._y, conf.height);
						context.strokeStyle = param._color = _conv(q[5], param._color);
						context.lineWidth = param._width = _conv(q[6], param._width);
						context.strokeRect(param._x, param._y, param._w, param._h);
						break;
					case 'fr':
					case 'fillRect':
						param._w = _conv(q[1], param._w, conf.width); param._h = _conv(q[2], param._h, conf.height);
						param._x = _conv(q[3], param._x, conf.width); param._y = _conv(q[4], param._y, conf.height);
						context.fillStyle = param._color = _conv(q[5], param._color);
						context.fillRect(param._x, param._y, param._w, param._h);
						break;
					case 'cr':
					case 'clearRect':
						param._w = _conv(q[1], param._w, conf.width); param._h = _conv(q[2], param._h, conf.height);
						param._x = _conv(q[3], param._x, conf.width); param._y = _conv(q[4], param._y, conf.height);
						context.clearRect(param._x, param._y, param._w, param._h);
						break;
					case 'font':
					case 'tf':
					case 'textFont':
						context.font = param._text_font = _conv(q.slice(1).join(' '));
						break;
					case 't':
					case 'text':
					case 'ft':
					case 'fillText':
						param._text = _conv(q.slice(1).join(' ')).replace('%3B', ';');
						context.font = param._text_font
						context.fillStyle = param._color;
						context.fillText(param._text, param._x, param._y);
						break;
					case 'st':
					case 'strokeText':
						param._text = _conv(q.slice(1).join(' ')).replace('%3B', ';');
						context.font = param._text_font
						context.strokeStyle = param._color;
						context.strokeText(param._text, param._x, param._y);
						break;
					case 'i':
					case 'img':
					case 'image':
						param._src = _conv(q[1], param._src);
						param._x = _conv(q[2], param._x, conf.width); param._y = _conv(q[3], param._y, conf.height);
						if (!!param._src) {
							let img = new Image();
							img.onload = function(){
								context.drawImage(img, param._x, param._y);
								wait_count--;
							}
							wait_count++;
							img.src = param._src;
						}
						break;
					case 'iTo':
					case 'imgTo':
					case 'imageTo':
						param._src = _conv(q[1], param._src);
						param._w = _conv(q[2], param._w, conf.width); param._h = _conv(q[3], param._h, conf.height);
						param._x = _conv(q[4], param._x, conf.width); param._y = _conv(q[5], param._y, conf.height);
						if (!!param._src) {
							let img = new Image();
							img.onload = function(){
								context.drawImage(img, param._x, param._y, param._w, param._h);
								wait_count--;
							}
							wait_count++;
							img.src = param._src;
						}
						break;
					case 'wait':
						if (wait_count > 0) {
							l--;
						}
						break;
					case 'bp':
					case 'beginPath':
						context.beginPath();
						break;
					case 'cp':
					case 'closePath':
						context.closePath();
						break;
					case 'lc':
					case 'lineCap':
						context.lineCap = param._line_cap += Number(_conv(q[1], _line_cap, Math.min(conf.width, conf.height)));
						break;
					case 'l':
					case 'line':
					case 'lineTo':
						param._x += Number(_conv(q[1], param._x, conf.width));
						param._y += Number(_conv(q[2], param._y, conf.height));
						context.strokeStyle = param._color = _conv(q[3], param._color);
						context.lineWidth = param._width = _conv(q[4], param._width);
						context.lineTo(param._x, param._y);
						break;
					case 'arc':
						param._r = _conv(q[1], param._r, Math.min(conf.width, conf.height));
						param._x = _conv(q[2], param._x, conf.width); param._y = _conv(q[3], param._y, conf.height);
						param._sa = _conv(q[4], param._sa); param._ea = _conv(q[5], param._ea);
						context.strokeStyle = param._color = _conv(q[6], param._color);
						context.lineWidth = param._width = _conv(q[7], param._width);
						context.arc(param._x, param._y, param._r, Math.PI * param._sa, Math.PI * param._ea);
						break;
					case 'el':
					case 'ellipse':
						param._w = _conv(q[1], param._w, conf.width); param._h = _conv(q[2], param._h, conf.height);
						param._x = _conv(q[3], param._x, conf.width); param._y = _conv(q[4], param._y, conf.height);
						param._sa = _conv(q[5], param._sa); param._ea = _conv(q[6], param._ea); param._ra = _conv(q[7], param._ra);
						context.strokeStyle = param._color = _conv(q[8], param._color);
						context.lineWidth = param._width = _conv(q[9], param._width);
						context.ellipse(param._x, param._y, param._w, param._h, Math.PI * param._ra, Math.PI * param._sa, Math.PI * param._ea);
						break;
					case 'f':
					case 'fill':
						context.fillStyle = param._color = _conv(q[1], param._color);
						context.fill();
						break;
					case 's':
					case 'stroke':
						context.strokeStyle = param._color = _conv(q[1], param._color);
						context.stroke();
						break;

					case 'let':
						param[_conv(q[1])] = _conv(q.slice(2).join(' '));
						break;
					case 'add':
						param[_conv(q[1])] += _conv(q.slice(2).join(' '));
						break;
					case 'sub':
						param[_conv(q[1])] -= _conv(q.slice(2).join(' '));
						break;
					case 'rand':
						param[_conv(q[1])] = _rand(param._rand_bound = _conv(q[2], param._rand_bound));
					break;

					case 'skip':
						param._step_delta = _conv(q[1], 0);
						l += check_step(param._step_delta);
						break;
					case 'if':
						param._condition = _conv(q[1], param._condition);
						param._step_delta = _conv(q[2], 0);
						if (param._condition !== 0) {
							if (labels[param._step_delta]) {
								l = labels[param._step_delta];
							} else {
								l += check_step(param._step_delta);
							}
						}
						break;
					case 'loop':
						//console.dir(q);
						var count = _conv('$' + q[1], 0) - 1;
						param[_conv(q[1])] = count;
						//console.log("c="+count);
						param._step_delta = _conv(q[2], 0);
						if (check_step(count) > 0 && labels[q[2]]) {
							l = labels[q[2]];
						} else if (check_step(count) > 0 && !!check_step(param._step_delta)) {
							l += param._step_delta;
						}
						break;
					case 'nop':
						break;

					case 'face':
						param._face_mode = _conv(q[1], param._face_mode);
						param._face_type = _conv(q[2], param._face_type);
						param._w = _conv(q[3], param._w, conf.width); param._h = _conv(q[4], param._h, conf.height);
						param._x = _conv(q[5], param._x, conf.width); param._y = _conv(q[6], param._y, conf.height);
						param._width = _conv(q[7], param._width);
						param._color = _conv(q[8], param._color);
						RTK_2D_Face(context, param._face_type, param._face_mode, param._w, param._h, param._x, param._y, param._color, param._width);
						break;

					default:
						if (q[0].startsWith('##')) {
							console.log('rtk-board: ' + q.join(' ').substring(2));
						} else if (q[0].startsWith('#')) {
							// Do nothing
						} else {
							console.log('rtk-board (skip): ' + JSON.stringify(que[l]));
						}
				}
				//console.dir(param)
			}
		}
		//console.log("rtk-output: param = ", JSON.stringify(param));
	});

});
