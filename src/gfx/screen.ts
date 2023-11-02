export const screenVertexData = [
	[
		[-1, 1],
		[1, 1],
		[-1, -1],
		[1, -1],
	],
];
export const screenIndexData = [
	[
		[0, 2, 3],
		[3, 1, 0],
	],
];

export const screenVertexSource = `precision highp float;

attribute vec2 position;

void main() {
	gl_Position = vec4(position, 0.0, 1.0);
}`;
