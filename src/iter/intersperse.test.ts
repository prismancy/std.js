import { expect, test } from "vitest";
import { intersperse } from "./intersperse";
import { range } from "./range";

test("zero items", () => {
  const iter = range(0);
  const interspersed = intersperse(iter, "sep");
  expect([...interspersed]).toEqual([]);
});

test("one item", () => {
  const iter = range(1);
  const interspersed = intersperse(iter, "sep");
  expect([...interspersed]).toEqual([0]);
});

test("multiple items", () => {
  const iter = range(5);
  const interspersed = intersperse(iter, "sep");
  expect([...interspersed]).toEqual([
    0,
    "sep",
    1,
    "sep",
    2,
    "sep",
    3,
    "sep",
    4,
  ]);
});
