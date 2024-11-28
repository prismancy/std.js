import { expect, test } from "vitest";
import { collect, every, filter } from "../iter";
import { pipe } from "./pipe";

test(() => {
  const add = (x: number) => (y: number) => x + y;
  const double = (x: number) => x * 2;
  const addThenDouble = pipe(2, add(1), double);
  expect(addThenDouble).toBe(6);
});

test(() => {
  const add = (x: number) => (y: number) => x + y;
  const addThenDouble = pipe(2, add(1));
  expect(addThenDouble).toBe(3);
});

test(() => {
  const add = (x: number) => (y: number) => x + y;
  const addThenDouble = pipe(2, add(1), add(2));
  expect(addThenDouble).toBe(5);
});

test(() => {
  const array = [1, 2, 3, 4, 5];
  const even = pipe(
    array,
    filter(x => !(x % 2)),
    collect,
  );
  expect(even).toEqual([2, 4]);
});

test(() => {
  const array = [1, 2, 3, 4, 5];
  const gotEven = pipe(
    array,
    filter(x => !(x % 2)),
    every(x => !(x % 2)),
  );
  expect(gotEven);
});

test(() => {
  const array = [1, 2, 3, 4, 5];
  const allEven = pipe(
    array,
    every(x => !(x % 2)),
  );
  expect(!allEven);
});
