import { assert, test } from "vitest";
import { MinHeap } from "./min-heap";

test("min heap", () => {
  const minHeap = new MinHeap<number>();
  const values: number[] = [-10, 9, -1, 100, 9, 1, 0, 9, -100, 10, -9];
  const expected: number[] = [-100, -10, -9, -1, 0, 1, 9, 9, 9, 10, 100];
  let actual: number[] = [];

  assert.equal(minHeap.length, 0);
  assert.equal(minHeap.peek(), undefined);
  for (const [i, value] of values.entries()) {
    assert.equal(minHeap.push(value), i + 1);
  }

  assert.equal(minHeap.length, values.length);
  while (minHeap.length) {
    assert.equal(minHeap.peek(), expected[actual.length]);
    actual.push(minHeap.pop()!);
    assert.equal(minHeap.length, expected.length - actual.length);
  }

  assert.deepEqual(minHeap.peek(), undefined);
  assert.deepEqual(actual, expected);

  actual = [];
  assert.equal(minHeap.push(...values), values.length);
  assert.equal(minHeap.length, values.length);
  assert.equal(minHeap.peek(), expected[0]);
  for (const value of minHeap.drain()) {
    actual.push(value);
    assert.equal(minHeap.length, expected.length - actual.length);
    assert.equal(minHeap.peek(), expected[actual.length]);
  }

  assert.deepEqual(actual, expected);
});
