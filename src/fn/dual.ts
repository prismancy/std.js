/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { type AnyFunction } from "../types";

export type Dual<Fn extends AnyFunction, Args = Parameters<Fn>> = Args extends [
	infer First,
	...infer Rest,
]
	? {
			(first: First, ...rest: Rest): ReturnType<Fn>;
			(...rest: Rest): (first: First) => ReturnType<Fn>;
	  }
	: never;

/**
 * Allows a function to be used in a data-first manner in a pipe
 * @param fn
 * @returns a functions a that takes in the rest of the arguments of `fn` and returns a function that takes the first argument of `fn` to finally return the result of `fn`
 */
export const dual =
	<Fn extends AnyFunction>(fn: Fn): Dual<Fn> =>
	// @ts-ignore
	(...args: any[]) => {
		// @ts-ignore
		if (args.length === fn.length) return fn(...args);
		// @ts-ignore
		return (first: First) => fn(first, ...args);
	};
