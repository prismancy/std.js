export type Pipeable = {
	<T, R0>(x: T, fn0: (x: T) => R0): R0;
	<T, R0, R1>(x: T, fn0: (x: T) => R0, fn1: (x: R0) => R1): R1;
	<T, R0, R1, R2>(
		x: T,
		fn0: (x: T) => R0,
		fn1: (x: R0) => R1,
		fn2: (x: R1) => R2,
	): R2;
	<T, R0, R1, R2, R3>(
		x: T,
		fn0: (x: T) => R0,
		fn1: (x: R0) => R1,
		fn2: (x: R1) => R2,
		fn3: (x: R2) => R3,
	): R3;
	<T, R0, R1, R2, R3, R4>(
		x: T,
		fn0: (x: T) => R0,
		fn1: (x: R0) => R1,
		fn2: (x: R1) => R2,
		fn3: (x: R2) => R3,
		fn4: (x: R3) => R4,
	): R4;
	<T, R0, R1, R2, R3, R4, R5>(
		x: T,
		fn0: (x: T) => R0,
		fn1: (x: R0) => R1,
		fn2: (x: R1) => R2,
		fn3: (x: R2) => R3,
		fn4: (x: R3) => R4,
		fn5: (x: R4) => R5,
	): R5;
	<T, R0, R1, R2, R3, R4, R5, R6>(
		x: T,
		fn0: (x: T) => R0,
		fn1: (x: R0) => R1,
		fn2: (x: R1) => R2,
		fn3: (x: R2) => R3,
		fn4: (x: R3) => R4,
		fn5: (x: R4) => R5,
		fn6: (x: R5) => R6,
	): R6;
	<T, R0, R1, R2, R3, R4, R5, R6, R7>(
		x: T,
		fn0: (x: T) => R0,
		fn1: (x: R0) => R1,
		fn2: (x: R1) => R2,
		fn3: (x: R2) => R3,
		fn4: (x: R3) => R4,
		fn5: (x: R4) => R5,
		fn6: (x: R5) => R6,
		fn7: (x: R6) => R7,
	): R7;
	<T, R0, R1, R2, R3, R4, R5, R6, R7, R8>(
		x: T,
		fn0: (x: T) => R0,
		fn1: (x: R0) => R1,
		fn2: (x: R1) => R2,
		fn3: (x: R2) => R3,
		fn4: (x: R3) => R4,
		fn5: (x: R4) => R5,
		fn6: (x: R5) => R6,
		fn7: (x: R6) => R7,
		fn8: (x: R7) => R8,
	): R8;
	<T, R0, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
		x: T,
		fn0: (x: T) => R0,
		fn1: (x: R0) => R1,
		fn2: (x: R1) => R2,
		fn3: (x: R2) => R3,
		fn4: (x: R3) => R4,
		fn5: (x: R4) => R5,
		fn6: (x: R5) => R6,
		fn7: (x: R6) => R7,
		fn8: (x: R7) => R8,
		fn9: (x: R8) => R9,
	): R9;
};

export const pipe: Pipeable = <T>(x: T, ...fns: Array<(x: T) => T>) =>
	fns.reduce((x, fn) => fn(x), x);
