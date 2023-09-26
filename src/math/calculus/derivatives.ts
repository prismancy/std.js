import { ln } from "../funcs";
import { cot, csc, sec, sin, tan } from "../trig";

export const dcos = (x: number) => -sin(x);
export const dtan = (x: number) => sec(x) ** 2;

export const dsec = (x: number) => sec(x) * tan(x);
export const dcsc = (x: number) => -csc(x) * cot(x);
export const dcot = (x: number) => -(csc(x) ** 2);

export const dtanh = (x: number) => 1 - x * x;

export const dln = (x: number) => 1 / x;
export const dlog = (base: number, x: number) => 1 / (x * ln(base));

export { cos as dsin } from "../trig";
