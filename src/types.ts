/**
 * @module
 * Useful utility types for Typescript
 */

export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | undefined
  | null;

export type int = number;
export type uint = number;

export type Maybe<T> = T | undefined;
export type Nullish<T> = Maybe<T> | null;

export type AnyRecord = Record<PropertyKey, any>;
export type AnyFunction = (...args: any[]) => any;

export type MaybeArray<T> = T | T[];
export type MaybeReadonlyArray<T> = T | readonly T[];

export type Dict<T> = Record<string, T>;

export type Indexable<T> = Record<number, T>;

export type Result<T, E = Error> = [T, undefined] | [undefined, E];

export type Awaitable<T> = T | Promise<T>;

// https://github.com/total-typescript/ts-reset/blob/b2df073b6b0fcb9f9599408d88cf559344c10586/src/entrypoints/utils.d.ts#L2C70-L2C70
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
