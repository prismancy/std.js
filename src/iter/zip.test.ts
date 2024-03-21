import { expect, test } from "vitest";
import { zip } from "./zip";

test("same length", () => {
  const array1 = [1, 2, 3, 4, 5];
  const array2 = ["a", "b", "c", "d", "e"];
  const zipped = zip(array1, array2);
  expect([...zipped]).toEqual([
    [1, "a"],
    [2, "b"],
    [3, "c"],
    [4, "d"],
    [5, "e"],
  ]);
});

test("first longer", () => {
  const array1 = [1, 2, 3, 4, 5, 6, 7];
  const array2 = ["a", "b", "c", "d", "e"];
  const zipped = zip(array1, array2);
  expect([...zipped]).toEqual([
    [1, "a"],
    [2, "b"],
    [3, "c"],
    [4, "d"],
    [5, "e"],
  ]);
});

test("second longer", () => {
  const array1 = [1, 2, 3, 4, 5];
  const array2 = ["a", "b", "c", "d", "e", "f"];
  const zipped = zip(array1, array2);
  expect([...zipped]).toEqual([
    [1, "a"],
    [2, "b"],
    [3, "c"],
    [4, "d"],
    [5, "e"],
  ]);
});
