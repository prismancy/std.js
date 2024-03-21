import { type Awaitable } from "../types.ts";

export type Pipe = {
  <T>(x: T): T;
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

export const pipe: Pipe = <T>(x: T, ...fns: Array<(x: T) => T>) =>
  fns.reduce((x, fn) => fn(x), x);

export type AsyncPipe = {
  <T>(x: Awaitable<T>): Promise<T>;
  <T, R0>(x: Awaitable<T>, fn0: (x: T) => Awaitable<R0>): Promise<R0>;
  <T, R0, R1>(
    x: Awaitable<T>,
    fn0: (x: Awaited<T>) => Awaitable<R0>,
    fn1: (x: Awaited<R0>) => Awaitable<R1>,
  ): Promise<R1>;
  <T, R0, R1, R2>(
    x: Awaitable<T>,
    fn0: (x: Awaited<T>) => Awaitable<R0>,
    fn1: (x: Awaited<R0>) => Awaitable<R1>,
    fn2: (x: Awaited<R1>) => Awaitable<R2>,
  ): Promise<R2>;
  <T, R0, R1, R2, R3>(
    x: Awaitable<T>,
    fn0: (x: Awaited<T>) => Awaitable<R0>,
    fn1: (x: Awaited<R0>) => Awaitable<R1>,
    fn2: (x: Awaited<R1>) => Awaitable<R2>,
    fn3: (x: Awaited<R2>) => Awaitable<R3>,
  ): Promise<R3>;
  <T, R0, R1, R2, R3, R4>(
    x: Awaitable<T>,
    fn0: (x: Awaited<T>) => Awaitable<R0>,
    fn1: (x: Awaited<R0>) => Awaitable<R1>,
    fn2: (x: Awaited<R1>) => Awaitable<R2>,
    fn3: (x: Awaited<R2>) => Awaitable<R3>,
    fn4: (x: Awaited<R3>) => Awaitable<R4>,
  ): Promise<R4>;
  <T, R0, R1, R2, R3, R4, R5>(
    x: Awaitable<T>,
    fn0: (x: Awaited<T>) => Awaitable<R0>,
    fn1: (x: Awaited<R0>) => Awaitable<R1>,
    fn2: (x: Awaited<R1>) => Awaitable<R2>,
    fn3: (x: Awaited<R2>) => Awaitable<R3>,
    fn4: (x: Awaited<R3>) => Awaitable<R4>,
    fn5: (x: Awaited<R4>) => Awaitable<R5>,
  ): Promise<R5>;
  <T, R0, R1, R2, R3, R4, R5, R6>(
    x: Awaitable<T>,
    fn0: (x: Awaited<T>) => Awaitable<R0>,
    fn1: (x: Awaited<R0>) => Awaitable<R1>,
    fn2: (x: Awaited<R1>) => Awaitable<R2>,
    fn3: (x: Awaited<R2>) => Awaitable<R3>,
    fn4: (x: Awaited<R3>) => Awaitable<R4>,
    fn5: (x: Awaited<R4>) => Awaitable<R5>,
    fn6: (x: Awaited<R5>) => Awaitable<R6>,
  ): Promise<R6>;
  <T, R0, R1, R2, R3, R4, R5, R6, R7>(
    x: Awaitable<T>,
    fn0: (x: Awaited<T>) => Awaitable<R0>,
    fn1: (x: Awaited<R0>) => Awaitable<R1>,
    fn2: (x: Awaited<R1>) => Awaitable<R2>,
    fn3: (x: Awaited<R2>) => Awaitable<R3>,
    fn4: (x: Awaited<R3>) => Awaitable<R4>,
    fn5: (x: Awaited<R4>) => Awaitable<R5>,
    fn6: (x: Awaited<R5>) => Awaitable<R6>,
    fn7: (x: Awaited<R6>) => Awaitable<R7>,
  ): Promise<R7>;
  <T, R0, R1, R2, R3, R4, R5, R6, R7, R8>(
    x: Awaitable<T>,
    fn0: (x: Awaited<T>) => Awaitable<R0>,
    fn1: (x: Awaited<R0>) => Awaitable<R1>,
    fn2: (x: Awaited<R1>) => Awaitable<R2>,
    fn3: (x: Awaited<R2>) => Awaitable<R3>,
    fn4: (x: Awaited<R3>) => Awaitable<R4>,
    fn5: (x: Awaited<R4>) => Awaitable<R5>,
    fn6: (x: Awaited<R5>) => Awaitable<R6>,
    fn7: (x: Awaited<R6>) => Awaitable<R7>,
    fn8: (x: Awaited<R7>) => Awaitable<R8>,
  ): Promise<R8>;
  <T, R0, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
    x: Awaitable<T>,
    fn0: (x: Awaited<T>) => Awaitable<R0>,
    fn1: (x: Awaited<R0>) => Awaitable<R1>,
    fn2: (x: Awaited<R1>) => Awaitable<R2>,
    fn3: (x: Awaited<R2>) => Awaitable<R3>,
    fn4: (x: Awaited<R3>) => Awaitable<R4>,
    fn5: (x: Awaited<R4>) => Awaitable<R5>,
    fn6: (x: Awaited<R5>) => Awaitable<R6>,
    fn7: (x: Awaited<R6>) => Awaitable<R7>,
    fn8: (x: Awaited<R7>) => Awaitable<R8>,
    fn9: (x: Awaited<R8>) => Awaitable<R9>,
  ): Promise<R9>;
};

export const asyncPipe: AsyncPipe = async <T>(
  x: Awaitable<T>,
  ...fns: Array<(x: T) => Awaitable<T>>
) => {
  for (const fn of fns) {
    x = fn(await x);
  }

  return x;
};
