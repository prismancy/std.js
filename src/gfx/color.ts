import { Vec3, vec3 } from "../math/mod.ts";

export function hsv2rgb(h: number, s: number, v: number): Vec3 {
	let r = 0;
	let g = 0;
	let b = 0;
	const i = Math.floor(h * 6);
	const f = h * 6 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);

	switch (i % 6) {
		case 0: {
			r = v;
			g = t;
			b = p;
			break;
		}

		case 1: {
			r = q;
			g = v;
			b = p;
			break;
		}

		case 2: {
			r = p;
			g = v;
			b = t;
			break;
		}

		case 3: {
			r = p;
			g = q;
			b = v;
			break;
		}

		case 4: {
			r = t;
			g = p;
			b = v;
			break;
		}

		case 5: {
			r = v;
			g = p;
			b = q;
			break;
		}
	}

	return vec3(Math.floor(r * 256), Math.floor(g * 256), Math.floor(b * 256));
}

/**
 * Calculates the CIE luminance of a color
 * @param r red
 * @param g green
 * @param b blue
 * @returns the luminance of the color
 */
export function luminance(r: number, g: number, b: number): number {
	return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 256;
}
