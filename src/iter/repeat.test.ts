import { expect, test } from "vitest";
import { pipe } from "../fn";
import { collect } from "./collect";
import { range } from "./range";
import { repeat } from "./repeat";

test("zero items", () => {
  const iter = range(0);
  const repeated = repeat(iter, 3);
  expect([...repeated]).toEqual([]);

  expect(pipe(range(0), repeat(3), collect)).toEqual([]);
});

test("one item", () => {
  const iter = range(1);
  const repeated = repeat(iter, 3);
  const expected = [0, 0, 0];
  expect([...repeated]).toEqual(expected);

  expect(pipe(range(1), repeat(3), collect)).toEqual(expected);
});

test("multiple items", () => {
  const iter = range(5);
  const repeated = repeat(iter, 3);
  const expected = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4];
  expect([...repeated]).toEqual(expected);

  expect(pipe(range(5), repeat(3), collect)).toEqual(expected);
});
