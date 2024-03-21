import { expect, test } from "vitest";
import { ascend, descend } from "./cmp";
import { range } from "./iter";
import { shuffle } from "./random";

test("ascend", () => {
  const array = shuffle([...range(100)]);
  expect(array.sort(ascend)).toEqual(array.sort((a, b) => a - b));
});

test("descend", () => {
  const array = shuffle([...range(100)]);
  expect(array.sort(descend)).toEqual(array.sort((a, b) => b - a));
});
