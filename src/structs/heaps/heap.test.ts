import { assert, test } from "vitest";
import { ascend, descend } from "../../cmp";
import { Heap } from "./heap";

interface Container {
  id: number;
  values: number[];
}

test("containing objects", () => {
  const heap = new Heap<Container>((a: Container, b: Container) =>
    ascend(a.id, b.id),
  );
  const ids: number[] = [-10, 9, -1, 100, 1, 0, -100, 10, -9];

  for (const [i, id] of ids.entries()) {
    const newContainer: Container = { id, values: [] };
    assert.equal(heap.push(newContainer), i + 1);
    newContainer.values.push(i - 1, i, i + 1);
    assert.equal(heap.length, i + 1);
  }

  const expected: number[] = [-100, -10, -9, -1, 0, 1, 9, 10, 100];
  const expectedValue: number[] = [6, 0, 8, 2, 5, 4, 1, 7, 3];
  for (let i = 0; i < ids.length; i++) {
    assert.equal(heap.length, ids.length - i);

    const expectedContainer = {
      id: expected[i],
      values: [expectedValue[i]! - 1, expectedValue[i], expectedValue[i]! + 1],
    };
    assert.deepEqual(heap.peek(), expectedContainer);
    assert.deepEqual(heap.pop(), expectedContainer);
  }

  assert.equal(heap.length, 0);
});

test("README example", () => {
  const maxHeap = new Heap<number>(descend);
  maxHeap.push(4, 1, 3, 5, 2);
  assert.equal(maxHeap.peek(), 5);
  assert.equal(maxHeap.pop(), 5);
  assert.deepEqual([...maxHeap.drain()], [4, 3, 2, 1]);
  assert.deepEqual([...maxHeap], []);

  const minHeap = new Heap<number>(ascend);
  minHeap.push(4, 1, 3, 5, 2);
  assert.equal(minHeap.peek(), 1);
  assert.equal(minHeap.pop(), 1);
  assert.deepEqual([...minHeap.drain()], [2, 3, 4, 5]);
  assert.deepEqual([...minHeap], []);

  const words = new Heap<string>((a, b) => descend(a.length, b.length));
  words.push("truck", "car", "helicopter", "tank");
  assert.equal(words.peek(), "helicopter");
  assert.equal(words.pop(), "helicopter");
  assert.deepEqual([...words.drain()], ["truck", "tank", "car"]);
  assert.deepEqual([...words], []);
});
