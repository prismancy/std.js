import { expect, test } from "vitest";
import { avg } from "./avg";
import { range } from "./range";

test("zero items", () => {
  const iter: number[] = [];
  const average = avg(iter);
  expect(average).toEqual(Number.NaN);
});

test("one item", () => {
  const iter = [4];
  const average = avg(iter);
  expect(average).toEqual(4);
});

test("multiple items", () => {
  const iter = range(5);
  const average = avg(iter);
  expect(average).toEqual(2);
});
