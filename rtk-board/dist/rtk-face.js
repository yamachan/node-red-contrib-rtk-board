function RTK_2D_Face(context, _type, _mode, _w, _h, _x, _y, _color, _width) {
	context.strokeStyle = context.fillStyle = _color;
	context.lineWidth = _width;
	let x = _x + _w / 2;
	let y = _y + _h / 2;
	let r = Math.min(_w / 2, _h / 2);

	context.beginPath();
	context.ellipse(x, y, _w / 2, _h / 2, 0, 0, Math.PI * 2);
	context.stroke();

	context.beginPath();
	context.ellipse(x, y, _w * 0.3, _h * 0.3, 0, Math.PI * 0.1, Math.PI * 0.9);
	context.stroke();

	context.beginPath();
	context.arc(x - _w * 0.2, y - _h * 0.15, r * 0.08 + _width, 0, Math.PI * 2);
	context.fill();

	context.beginPath();
	context.arc(x + _w * 0.2, y - _h * 0.15, r * 0.08 + _width, 0, Math.PI * 2);
	context.fill();
}
