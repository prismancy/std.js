import { ln } from "../funcs";
import { cot, csc, sec, sin, tan } from "../trig";

export const dcos = (x: number) => -sin(x);
export const dtan = (x: number) => {
	const t = sec(x);
	return t * t;
};

export const dsec = (x: number) => sec(x) * tan(x);
export const dcsc = (x: number) => -csc(x) * cot(x);
export const dcot = (x: number) => {
	const t = csc(x);
	return -t * t;
};

export const dtanh = (x: number) => 1 - x * x;

export const dln = (x: number) => 1 / x;
export const dlog = (base: number, x: number) => 1 / (x * ln(base));

export { cos as dsin } from "../trig";
