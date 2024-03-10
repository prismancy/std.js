import { ln } from "../funcs.ts";
import { cot, csc, sec, sin, tan } from "../trig/mod.ts";

export const dcos = (x: number): number => -sin(x);
export const dtan = (x: number): number => {
	const t = sec(x);
	return t * t;
};

export const dsec = (x: number): number => sec(x) * tan(x);
export const dcsc = (x: number): number => -csc(x) * cot(x);
export const dcot = (x: number): number => {
	const t = csc(x);
	return -t * t;
};

export const dtanh = (x: number): number => 1 - x * x;

export const dln = (x: number): number => 1 / x;
export const dlog = (base: number, x: number): number => 1 / (x * ln(base));

export { cos as dsin } from "../trig/mod.ts";
