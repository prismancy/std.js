import { expect, test } from "vitest";
import { identity, memo, memoize, once } from ".

test("identity", () => {
  expect(identity(1)).toEqual(1);
  expect(identity(false)).toEqual(false);
});

test("once", () => {
  let count = 0;
  const increment = () => ++count;
  const fn = once(increment);
  fn();
  expect(count).toEqual(1);
  fn();
  expect(count).toEqual(1);
});

test("memoize", () => {
  let count = 0;
  function timesTwo(x: number) {
    count++;
    return x * 2;
  }

  const fn = memoize(timesTwo);
  expect(fn(2)).toEqual(4);
  expect(count).toEqual(1);
  expect(fn(2)).toEqual(4);
  expect(count).toEqual(1);

  expect(fn(3)).toEqual(6);
  expect(count).toEqual(2);
  expect(fn(3)).toEqual(6);
  expect(count).toEqual(2);
});

test("memo", () => {
  let count = 0;
  const increment = () => ++count;
  const fn = memo(increment);
  expect(fn()).toEqual(1);
  expect(fn()).toEqual(1);
});
