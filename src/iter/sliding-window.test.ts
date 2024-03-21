import { describe, expect, test } from "vitest";
import { range } from "./range";
import { slidingWindow } from "./sliding-window";

describe("full window", () => {
  test("zero items", () => {
    const iter = range(0);
    const windowed = slidingWindow(iter, { size: 3 });
    expect([...windowed]).toEqual([]);
  });

  test("less than n items", () => {
    const iter = range(2);
    const windowed = slidingWindow(iter, { size: 3 });
    expect([...windowed]).toEqual([]);
  });

  test("exactly n items", () => {
    const iter = range(3);
    const windowed = slidingWindow(iter, { size: 3 });
    expect([...windowed]).toEqual([[0, 1, 2]]);
  });

  test("more than n items", () => {
    const iter = range(10);
    const windowed = slidingWindow(iter, { size: 3 });
    expect([...windowed]).toEqual([
      [0, 1, 2],
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
      [4, 5, 6],
      [5, 6, 7],
      [6, 7, 8],
      [7, 8, 9],
    ]);
  });
});

test("partial window", () => {
  const iter = range(10);
  const windowed = slidingWindow(iter, { size: 3, partial: true });
  expect([...windowed]).toEqual([
    [0],
    [0, 1],
    [0, 1, 2],
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5],
    [4, 5, 6],
    [5, 6, 7],
    [6, 7, 8],
    [7, 8, 9],
    [8, 9],
    [9],
  ]);
});
