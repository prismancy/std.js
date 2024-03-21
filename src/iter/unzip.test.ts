import { expect, test } from "vitest";
import { unzip } from "./unzip";

test("unzip", () => {
  const array = [
    [1, "a"],
    [2, "b"],
    [3, "c"],
    [4, "d"],
    [5, "e"],
  ] as const;
  const [array1, array2] = unzip(array);
  expect(array1).toEqual([1, 2, 3, 4, 5]);
  expect(array2).toEqual(["a", "b", "c", "d", "e"]);
});
