/* eslint-disable @typescript-eslint/ban-types */
export type Maybe<T> = T | undefined;

export type Nullish<T> = Maybe<T> | null;

export type AnyRecord = Record<PropertyKey, any>;

export type Indexable<T> = Record<number, T>;

// https://github.com/total-typescript/ts-reset/blob/main/src/entrypoints/utils.d.ts
export type NonFalsy<T> = T extends false | 0 | "" | null | undefined | 0n
	? never
	: T;
