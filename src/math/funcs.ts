import { mean, minmax } from "./stats";

export function norm(x: number, min: number, max: number): number {
	return (x - min) / (max - min);
}

export function lerp(min: number, max: number, norm: number): number {
	return min + (max - min) * norm;
}

export function map(
	x: number,
	fromMin: number,
	fromMax: number,
	toMin: number,
	toMax: number,
): number {
	return lerp(toMin, toMax, norm(x, fromMin, fromMax));
}

export function smoothstep(x: number, min: number, max: number): number {
	const n = norm(x, min, max);
	return n * n * (3 - 2 * n);
}

export function clamp(n: number, min: number, max: number): number {
	return Math.min(Math.max(n, min), max);
}

export function overlap(
	min1: number,
	max1: number,
	min2: number,
	max2: number,
): number {
	[min1, max1] = minmax(min1, max1);
	[min2, max2] = minmax(min2, max2);
	const range1 = max1 - min1;
	const range2 = max2 - min2;
	const range = Math.max(max1, max2) - Math.min(min1, min2);
	return range1 + range2 - range;
}

/** Returns which number (a or b) is closer to x */
export function closer(
	x: number,
	a: [number, number],
	b: [number, number],
): number {
	return Math.abs(x - a[0]) < Math.abs(x - b[0]) ? a[1] : b[1];
}

export function factorial(n: number): number {
	let total = 1;
	for (let i = n; i > 1; i--) {
		total *= i;
	}

	return total;
}

export function log(base: number, x: number): number {
	return Math.log(x) / Math.log(base);
}

export const ln = Math.log;

/**
 * Calculates the greatest common factor between the numbers
 * a and b using the [Euclidean algorithm](https://www.wikiwand.com/en/Euclidean_algorithm)
 * @param a a number
 * @param b a number
 */
export function gcd(a: number, b: number): number {
	while (b !== 0) [a, b] = [b, a % b];
	return a;
}

export function fibonacci(n: number): number {
	let a = 0;
	let b = 1;
	for (let i = 0; i < n; i++) {
		[a, b] = [b, b + a];
	}

	return a;
}

export const celsius = (fahrenheit: number): number =>
	(fahrenheit - 32) * (5 / 9);
export const fahrenheit = (celsius: number): number => celsius * (9 / 5) + 32;

/**
 * @param points a list of (x,y) points
 * @returns the line of best fit in terms of m and b in the form y = mx + b
 */
export function bestFitLine(
	points: Array<{ x: number; y: number }>,
): [m: number, b: number] {
	const xs = points.map(p => p.x);
	const ys = points.map(p => p.y);

	const meanX = mean(xs);
	const meanY = mean(ys);

	let number_ = 0;
	let den = 0;
	for (let i = 0; i < points.length; i++) {
		const x = xs[i]!;
		const y = ys[i]!;
		number_ += (x - meanX) * (y - meanY);
		den += (x - meanX) ** 2;
	}

	const m = number_ / den;
	const b = meanY - m * meanX;
	return [m, b];
}

export const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
export const relu = (x: number) => (x > 0 ? x : 0);
export const leakyRelu = (x: number, a = 0.01) => (x > 0 ? x : a * x);
