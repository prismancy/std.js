/**
 * @module
 * Easing functions
 */

export function linear(t: number): number {
  return t;
}

export function easeInQuad(t: number): number {
  return t * t;
}

export function easeOutQuad(t: number): number {
  return t * (2 - t);
}

export function easeInOutQuad(t: number): number {
  const t2 = 2 * t;
  return t < 0.5 ? t2 * t : -1 + (4 - t2) * t;
}

export function easeInCubic(t: number): number {
  return t * t * t;
}

export function easeOutCubic(t: number): number {
  return 1 + --t * t * t;
}

export function easeInOutCubic(t: number): number {
  const a = 2 * t - 2;
  return t < 0.5 ? 4 * t * t * t : (t - 1) * a * a + 1;
}

export function easeInQuart(t: number): number {
  const tt = t * t;
  return tt * tt;
}

export function easeOutQuart(t: number): number {
  const tt = --t * t;
  return 1 - tt * tt;
}

export function easeInOutQuart(t: number): number {
  const firstHalf = t < 0.5;
  const tt = t * t;
  const a = --t * t;
  return firstHalf ? 8 * tt * tt : 1 - 8 * a * a;
}

export function easeInQuint(t: number): number {
  const tt = t * t;
  return tt * tt * t;
}

export function easeOutQuint(t: number): number {
  const tt = --t * t;
  return 1 + tt * tt * t;
}

export function easeInOutQuint(t: number): number {
  const firstHalf = t < 0.5;
  const tt = t * t;
  const a = --t * t;
  return firstHalf ? 16 * tt * tt * t : 1 + 16 * a * a * t;
}

export function easeInSine(t: number): number {
  return 1 - Math.cos((t * Math.PI) / 2);
}

export function easeOutSine(t: number): number {
  return Math.sin((t * Math.PI) / 2);
}

export function easeInOutSine(t: number): number {
  return -(Math.cos(t * Math.PI) - 1) / 2;
}

export function easeInExpo(t: number): number {
  return t === 0 ? 0 : 2 ** (10 * (t - 1));
}

export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : -(2 ** (-10 * t)) + 1;
}

export function easeInOutExpo(t: number): number {
  if (t === 0 || t === 1) return t;
  return t < 0.5 ? 2 ** (20 * (t - 1)) / 2 : -(2 ** (-20 * t)) / 2 + 1;
}

export function easeInCirc(t: number): number {
  return 1 - Math.sqrt(1 - t * t);
}

export function easeOutCirc(t: number): number {
  return Math.sqrt(1 - --t * t);
}

export function easeInOutCirc(t: number): number {
  return t < 0.5
    ? (1 - Math.sqrt(1 - 2 * t)) / 2
    : (Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}

export function easeInElastic(t: number): number {
  if (t === 0 || t === 1) return t;
  return -(2 ** (10 * (t - 1))) * Math.sin((t - 1.1) * 5 * Math.PI);
}

export function easeOutElastic(t: number): number {
  if (t === 0 || t === 1) return t;
  return 2 ** (-10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
}

export function easeInOutElastic(t: number): number {
  if (t === 0 || t === 1) return t;
  return t < 0.5
    ? -(2 ** (20 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI)) / 2
    : (2 ** (-20 * t) * Math.sin((t - 1.1) * 5 * Math.PI)) / 2 + 1;
}

export function easeInBack(t: number): number {
  return t * t * (2.701_58 * t - 1.701_58);
}

export function easeOutBack(t: number): number {
  return --t * t * (2.701_58 * t + 1.701_58) + 1;
}

export function easeInOutBack(t: number): number {
  return t < 0.5
    ? (2.701_58 * t * t * t + 2) / 2
    : (1.701_58 * (t - 1) * (t - 1) * (t - 1) + 2) / 2;
}

export function easeInBounce(t: number): number {
  return 1 - easeOutBounce(1 - t);
}

export function easeOutBounce(t: number): number {
  if (t < 1 / 2.75) return 7.5625 * t * t;
  if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
  return t < 2.5 / 2.75
    ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
    : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984_375;
}

export function easeInOutBounce(t: number): number {
  return t < 0.5
    ? (1 - easeOutBounce(1 - t * 2)) / 2
    : (easeOutBounce(t * 2 - 1) + 1) / 2;
}
