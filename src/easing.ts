export function linear(t: number) {
	return t;
}

export function easeInQuad(t: number) {
	return t * t;
}

export function easeOutQuad(t: number) {
	return t * (2 - t);
}

export function easeInOutQuad(t: number) {
	return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function easeInCubic(t: number) {
	return t * t * t;
}

export function easeOutCubic(t: number) {
	return 1 + --t * t * t;
}

export function easeInOutCubic(t: number) {
	return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

export function easeInQuart(t: number) {
	return t * t * t * t;
}

export function easeOutQuart(t: number) {
	return 1 - --t * t * t * t;
}

export function easeInOutQuart(t: number) {
	return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
}

export function easeInQuint(t: number) {
	return t * t * t * t * t;
}

export function easeOutQuint(t: number) {
	return 1 + --t * t * t * t * t;
}

export function easeInOutQuint(t: number) {
	return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}

export function easeInSine(t: number) {
	return 1 - Math.cos((t * Math.PI) / 2);
}

export function easeOutSine(t: number) {
	return Math.sin((t * Math.PI) / 2);
}

export function easeInOutSine(t: number) {
	return -0.5 * (Math.cos(Math.PI * t) - 1);
}

export function easeInExpo(t: number) {
	return t === 0 ? 0 : 2 ** (10 * (t - 1));
}

export function easeOutExpo(t: number) {
	return t === 1 ? 1 : -(2 ** (-10 * t)) + 1;
}

export function easeInOutExpo(t: number) {
	if (t === 0) return 0;
	if (t === 1) return 1;
	return t < 0.5 ? 2 ** (20 * (t - 1)) / 2 : -(2 ** (-20 * t)) / 2 + 1;
}

export function easeInCirc(t: number) {
	return 1 - Math.sqrt(1 - t * t);
}

export function easeOutCirc(t: number) {
	return Math.sqrt(1 - --t * t);
}

export function easeInOutCirc(t: number) {
	return t < 0.5
		? (1 - Math.sqrt(1 - 2 * t)) / 2
		: (Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}

export function easeInElastic(t: number) {
	if (t === 0) return 0;
	if (t === 1) return 1;
	return -(2 ** (10 * (t - 1))) * Math.sin((t - 1.1) * 5 * Math.PI);
}

export function easeOutElastic(t: number) {
	if (t === 0) return 0;
	if (t === 1) return 1;
	return 2 ** (-10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
}

export function easeInOutElastic(t: number) {
	if (t === 0) return 0;
	if (t === 1) return 1;
	return t < 0.5
		? -(2 ** (20 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI)) / 2
		: (2 ** (-20 * t) * Math.sin((t - 1.1) * 5 * Math.PI)) / 2 + 1;
}

export function easeInBack(t: number) {
	return t * t * (2.701_58 * t - 1.701_58);
}

export function easeOutBack(t: number) {
	return --t * t * (2.701_58 * t + 1.701_58) + 1;
}

export function easeInOutBack(t: number) {
	return t < 0.5
		? (2.701_58 * t * t * t + 2) / 2
		: (1.701_58 * (t - 1) * (t - 1) * (t - 1) + 2) / 2;
}

export function easeInBounce(t: number) {
	return 1 - easeOutBounce(1 - t);
}

export function easeOutBounce(t: number) {
	if (t < 1 / 2.75) return 7.5625 * t * t;
	if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
	return t < 2.5 / 2.75
		? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
		: 7.5625 * (t -= 2.625 / 2.75) * t + 0.984_375;
}

export function easeInOutBounce(t: number) {
	return t < 0.5
		? (1 - easeOutBounce(1 - t * 2)) / 2
		: (easeOutBounce(t * 2 - 1) + 1) / 2;
}
