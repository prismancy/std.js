import { ln } from "../funcs.ts";
import { cos, cot, csc, sec, sin, tan } from "../trig/mod.ts";

export const isin = (x: number, c = 0): number => -cos(x) + c;
export const icos = (x: number, c = 0): number => sin(x) + c;
export const itan = (x: number, c = 0): number => -ln(Math.abs(cos(x))) + c;

export const isec = (x: number, c = 0): number =>
  ln(Math.abs(sec(x) + tan(x))) + c;
export const icsc = (x: number, c = 0): number =>
  -ln(Math.abs(csc(x) + cot(x))) + c;
export const icot = (x: number, c = 0): number => ln(Math.abs(sin(x))) + c;
