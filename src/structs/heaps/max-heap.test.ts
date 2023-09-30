import { assert, test } from "vitest";
import { MaxHeap } from "./max-heap";

test("max heap", () => {
	const maxHeap = new MaxHeap<number>();
	const values: number[] = [-10, 9, -1, 100, 9, 1, 0, 9, -100, 10, -9];
	const expected: number[] = [100, 10, 9, 9, 9, 1, 0, -1, -9, -10, -100];
	let actual: number[] = [];

	assert.equal(maxHeap.length, 0);
	assert.equal(maxHeap.peek(), undefined);
	for (const [i, value] of values.entries()) {
		assert.equal(maxHeap.push(value), i + 1);
	}

	assert.equal(maxHeap.length, values.length);
	while (maxHeap.length) {
		assert.equal(maxHeap.peek(), expected[actual.length]);
		actual.push(maxHeap.pop()!);
		assert.equal(maxHeap.length, expected.length - actual.length);
	}

	assert.equal(maxHeap.peek(), undefined);
	assert.deepEqual(actual, expected);

	actual = [];
	assert.equal(maxHeap.push(...values), values.length);
	assert.equal(maxHeap.length, values.length);
	assert.equal(maxHeap.peek(), expected[0]);
	for (const value of maxHeap.drain()) {
		actual.push(value);
		assert.equal(maxHeap.length, expected.length - actual.length);
		assert.equal(maxHeap.peek(), expected[actual.length]);
	}

	assert.deepEqual(actual, expected);
});
