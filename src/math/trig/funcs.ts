export const {
	sin,
	cos,
	tan,
	asin,
	acos,
	atan,
	atan2,
	sinh,
	cosh,
	tanh,
	asinh,
	acosh,
	atanh,
} = Math;

export const sec = (x: number) => 1 / cos(x);
export const csc = (x: number) => 1 / sin(x);
export const cot = (x: number) => 1 / tan(x);

export const asec = (x: number) => 1 / acos(x);
export const acsc = (x: number) => 1 / asin(x);
export const acot = (x: number) => 1 / atan(x);

export const sech = (x: number) => 1 / cosh(x);
export const csch = (x: number) => 1 / sinh(x);
export const coth = (x: number) => 1 / tanh(x);

export const asech = (x: number) => 1 / acosh(x);
export const acsch = (x: number) => 1 / asinh(x);
export const acoth = (x: number) => 1 / atanh(x);
