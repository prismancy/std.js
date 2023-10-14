/* eslint-disable @typescript-eslint/ban-types */

export type Maybe<T> = T | undefined;
export type Nullish<T> = Maybe<T> | null;

export type AnyRecord = Record<PropertyKey, unknown>;
export type AnyFunction = (...args: unknown[]) => unknown;

export type MaybeArray<T> = T | T[];
export type MaybeReadonlyArray<T> = T | readonly T[];

export type Dict<T> = Record<string, T>;

export type Indexable<T> = Record<number, T>;

export type Awaitable<T> = T | Promise<T>;

// https://github.com/total-typescript/ts-reset/blob/main/src/entrypoints/utils.d.ts
export type NonFalsy<T> = T extends false | 0 | "" | null | undefined | 0n
	? never
	: T;

export type Repeat<T, N extends number> = N extends 0
	? []
	: N extends 1
	? [T]
	: N extends 2
	? [T, T]
	: N extends 3
	? [T, T, T]
	: N extends 4
	? [T, T, T, T]
	: N extends 5
	? [T, T, T, T, T]
	: N extends 6
	? [T, T, T, T, T, T]
	: N extends 7
	? [T, T, T, T, T, T, T]
	: N extends 8
	? [T, T, T, T, T, T, T, T]
	: N extends 9
	? [T, T, T, T, T, T, T, T, T]
	: N extends 10
	? [T, T, T, T, T, T, T, T, T, T]
	: T[];
