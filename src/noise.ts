import { lerp, type Vec2Like } from "./math";
import { type int } from "./types";

// Create pseudorandom direction vector
function randomGradient(ix: int, iy: int): Vec2Like {
	const w = 16;
	const s = w / 2;
	let a = ix;
	let b = iy;
	a *= 3_284_157_443;
	b ^= (a << s) | (a >> (w - s));
	b *= 1_911_520_717;
	a ^= (b << s) | (b >> (w - s));
	a *= 2_048_419_325;
	const random = a * (3.141_592_65 / ~(~0 >> 1));
	return [Math.cos(random), Math.sin(random)];
}

// Computes the dot product of the distance and gradient vectors.
function dotGridGradient(ix: int, iy: int, x: number, y: number) {
	const gradient = randomGradient(ix, iy);

	const dx = x - ix;
	const dy = y - iy;

	return dx * gradient[0] + dy * gradient[1];
}

// Compute Perlin noise at coordinates x, y
export function perlin(x: number, y = 0) {
	const x0 = Math.floor(x);
	const x1 = x0 + 1;
	const y0 = Math.floor(y);
	const y1 = y0 + 1;

	const sx = x - x0;
	const sy = y - y0;

	let n0 = dotGridGradient(x0, y0, x, y);
	let n1 = dotGridGradient(x1, y0, x, y);
	const ix0 = lerp(n0, n1, sx);

	n0 = dotGridGradient(x0, y1, x, y);
	n1 = dotGridGradient(x1, y1, x, y);
	const ix1 = lerp(n0, n1, sx);

	const value = lerp(ix0, ix1, sy);
	return value * 0.5 + 0.5;
}
