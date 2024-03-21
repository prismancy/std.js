import { expect, test } from "vitest";
import { overlap } from "./funcs";

test("ranges overlap", () => {
  expect(overlap(0, 100, 50, 200)).toEqual(50);
  expect(overlap(100, 0, 200, 50)).toEqual(50);
});

test("ranges don't overlap", () => {
  expect(overlap(0, 100, 200, 300)).toEqual(-100);
  expect(overlap(100, 0, 300, 200)).toEqual(-100);
  expect(overlap(200, 300, 0, 100)).toEqual(-100);
  expect(overlap(300, 200, 100, 0)).toEqual(-100);
});
