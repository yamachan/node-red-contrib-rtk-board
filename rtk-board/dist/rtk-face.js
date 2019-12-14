function RTK_2D_Face(context, _type, _mode, _w, _h, _x, _y, _color, _width) {
	context.strokeStyle = context.fillStyle = _color;
	context.lineWidth = _width;
	let x = _x + _w / 2;
	let y = _y + _h / 2;
	let r = Math.min(_w / 2, _h / 2);

	// ----- Face -----

	context.beginPath();
	context.ellipse(x, y, _w / 2, _h / 2, 0, 0, Math.PI * 2);
	context.stroke();

	// ----- Eyes -----

	if (_mode === 'sad' || _mode === 'safe') {
		context.beginPath();
		context.ellipse(x - _w * 0.2, y - _h * 0.24, _w * 0.12, _h * 0.12, 0, Math.PI * 0.1, Math.PI * 0.9);
		context.stroke();
		context.beginPath();
		context.ellipse(x + _w * 0.2, y - _h * 0.24, _w * 0.12, _h * 0.12, 0, Math.PI * 0.1, Math.PI * 0.9);
		context.stroke();
	} else if (_mode === 'angry') {
		context.beginPath();
		context.moveTo(x - _w * 0.1, y - _h * 0.1);
		context.lineTo(x - _w * 0.3, y - _h * 0.25);
		context.stroke();
		context.beginPath();
		context.moveTo(x + _w * 0.1, y - _h * 0.1);
		context.lineTo(x + _w * 0.3, y - _h * 0.25);
		context.stroke();
	} else {
		context.beginPath();
		context.arc(x - _w * 0.2, y - _h * 0.15, r * 0.08 + _width, 0, Math.PI * 2);
		context.fill();
		context.beginPath();
		context.arc(x + _w * 0.2, y - _h * 0.15, r * 0.08 + _width, 0, Math.PI * 2);
		context.fill();
	}

	// ----- Mouth -----

	if (_mode === 'ugly' || _mode === 'sad' || _mode === 'angry') {
		context.beginPath();
		context.ellipse(x, y + _h * 0.5, _w * 0.3, _h * 0.3, 0, Math.PI * 1.2, Math.PI * 1.8);
		context.stroke();
	} else if (_mode === 'usual') {
		context.beginPath();
		context.moveTo(x - _w * 0.2, y + _h * 0.25);
		context.lineTo(x + _w * 0.2, y + _h * 0.25);
		context.stroke();
	} else {
		context.beginPath();
		context.ellipse(x, y, _w * 0.3, _h * 0.3, 0, Math.PI * 0.1, Math.PI * 0.9);
		context.stroke();
	}
}
