// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
import { assert, test } from "vitest";
import { ascend, descend } from "../../cmp";
import { BinarySearchTree } from "./bst";

interface Container {
	id: number;
	values: number[];
}

test("[collections/BinarySearchTree] with default ascend comparator", () => {
	const trees: Array<BinarySearchTree<number>> = [
		new BinarySearchTree(),
		new BinarySearchTree(),
	];
	const values: number[] = [-10, 9, -1, 100, 1, 0, -100, 10, -9];

	const expectedMin: number[][] = [
		[-10, -10, -10, -10, -10, -10, -100, -100, -100],
		[-9, -9, -100, -100, -100, -100, -100, -100, -100],
	];
	const expectedMax: number[][] = [
		[-10, 9, 9, 100, 100, 100, 100, 100, 100],
		[-9, 10, 10, 10, 10, 100, 100, 100, 100],
	];
	for (const [i, tree] of trees.entries()) {
		assert.equal(tree.size, 0);
		for (const [j, value] of values.entries()) {
			assert(!tree.has(value));
			assert(tree.insert(value));
			assert(tree.has(value));
			assert.equal(tree.size, j + 1);
			assert.equal(tree.min(), expectedMin[i]![j]);
			assert.equal(tree.max(), expectedMax[i]![j]);
		}

		for (const value of values) {
			assert(!tree.insert(value));
			assert.equal(tree.size, values.length);
			assert.equal(tree.min(), -100);
			assert.equal(tree.max(), 100);
		}

		values.reverse();
	}

	for (const tree of trees) {
		assert.deepEqual(
			[...tree.lnrValues()],
			[-100, -10, -9, -1, 0, 1, 9, 10, 100],
		);
		assert.equal(tree.size, values.length);

		assert.deepEqual([...tree], [-100, -10, -9, -1, 0, 1, 9, 10, 100]);
		assert.equal(tree.size, values.length);

		assert.deepEqual(
			[...tree.rnlValues()],
			[100, 10, 9, 1, 0, -1, -9, -10, -100],
		);
		assert.equal(tree.size, values.length);
	}

	assert.deepEqual(
		[...trees[0]!.nlrValues()],
		[-10, -100, 9, -1, -9, 1, 0, 100, 10],
	);
	assert.deepEqual(
		[...trees[1]!.nlrValues()],
		[-9, -100, -10, 10, 0, -1, 1, 9, 100],
	);
	for (const tree of trees) {
		assert.equal(tree.size, values.length);
	}

	assert.deepEqual(
		[...trees[0]!.lrnValues()],
		[-100, -9, 0, 1, -1, 10, 100, 9, -10],
	);
	assert.deepEqual(
		[...trees[1]!.lrnValues()],
		[-10, -100, -1, 9, 1, 0, 100, 10, -9],
	);
	for (const tree of trees) {
		assert.equal(tree.size, values.length);
	}

	assert.deepEqual(
		[...trees[0]!.lvlValues()],
		[-10, -100, 9, -1, 100, -9, 1, 10, 0],
	);
	assert.deepEqual(
		[...trees[1]!.lvlValues()],
		[-9, -100, 10, -10, 0, 100, -1, 1, 9],
	);
	for (const tree of trees) {
		assert.equal(tree.size, values.length);
	}

	for (const tree of trees) {
		const expected: number[] = [-100, -10, -9, -1, 0, 1, 9, 10, 100];
		for (const [j, value] of values.entries()) {
			assert.equal(tree.size, values.length - j);
			assert(tree.has(value));

			assert(tree.remove(value));
			expected.splice(expected.indexOf(value), 1);
			assert.deepEqual([...tree], expected);
			assert(!tree.has(value));

			assert(!tree.remove(value));
			assert.deepEqual([...tree], expected);
			assert(!tree.has(value));
		}

		assert.equal(tree.size, 0);
	}
});

test("[collections/BinarySearchTree] with descend comparator", () => {
	const trees: Array<BinarySearchTree<number>> = [
		new BinarySearchTree(descend),
		new BinarySearchTree(descend),
	];
	const values: number[] = [-10, 9, -1, 100, 1, 0, -100, 10, -9];

	const expectedMin: number[][] = [
		[-10, 9, 9, 100, 100, 100, 100, 100, 100],
		[-9, 10, 10, 10, 10, 100, 100, 100, 100, 100],
	];
	const expectedMax: number[][] = [
		[-10, -10, -10, -10, -10, -10, -100, -100, -100],
		[-9, -9, -100, -100, -100, -100, -100, -100, -100],
	];
	for (const [i, tree] of trees.entries()) {
		assert.equal(tree.size, 0);
		for (const [j, value] of values.entries()) {
			assert(!tree.has(value));
			assert(tree.insert(value));
			assert(tree.has(value));
			assert.equal(tree.size, j + 1);
			assert.equal(tree.min(), expectedMin[i]![j]);
			assert.equal(tree.max(), expectedMax[i]![j]);
		}

		for (const value of values) {
			assert(!tree.insert(value));
			assert.equal(tree.size, values.length);
			assert.equal(tree.min(), 100);
			assert.equal(tree.max(), -100);
		}

		values.reverse();
	}

	for (const tree of trees) {
		assert.deepEqual(
			[...tree.lnrValues()],
			[100, 10, 9, 1, 0, -1, -9, -10, -100],
		);
		assert.equal(tree.size, values.length);

		assert.deepEqual([...tree], [100, 10, 9, 1, 0, -1, -9, -10, -100]);
		assert.equal(tree.size, values.length);

		assert.deepEqual(
			[...tree.rnlValues()],
			[-100, -10, -9, -1, 0, 1, 9, 10, 100],
		);
		assert.equal(tree.size, values.length);
	}

	assert.deepEqual(
		[...trees[0]!.nlrValues()],
		[-10, 9, 100, 10, -1, 1, 0, -9, -100],
	);
	assert.deepEqual(
		[...trees[1]!.nlrValues()],
		[-9, 10, 100, 0, 1, 9, -1, -100, -10],
	);
	for (const tree of trees) {
		assert.equal(tree.size, values.length);
	}

	assert.deepEqual(
		[...trees[0]!.lrnValues()],
		[10, 100, 0, 1, -9, -1, 9, -100, -10],
	);
	assert.deepEqual(
		[...trees[1]!.lrnValues()],
		[100, 9, 1, -1, 0, 10, -10, -100, -9],
	);
	for (const tree of trees) {
		assert.equal(tree.size, values.length);
	}

	assert.deepEqual(
		[...trees[0]!.lvlValues()],
		[-10, 9, -100, 100, -1, 10, 1, -9, 0],
	);
	assert.deepEqual(
		[...trees[1]!.lvlValues()],
		[-9, 10, -100, 100, 0, -10, 1, -1, 9],
	);
	for (const tree of trees) {
		assert.equal(tree.size, values.length);
	}

	for (const tree of trees) {
		const expected: number[] = [100, 10, 9, 1, 0, -1, -9, -10, -100];
		for (const [j, value] of values.entries()) {
			assert.equal(tree.size, values.length - j);
			assert(tree.has(value));

			assert(tree.remove(value));
			expected.splice(expected.indexOf(value), 1);
			assert.deepEqual([...tree], expected);
			assert(!tree.has(value));

			assert(!tree.remove(value));
			assert.deepEqual([...tree], expected);
			assert(!tree.has(value));
		}

		assert.equal(tree.size, 0);
	}
});

test("[collections/BinarySearchTree] containing objects", () => {
	const tree = new BinarySearchTree<Container>((a: Container, b: Container) =>
		ascend(a.id, b.id),
	);
	const ids: number[] = [-10, 9, -1, 100, 1, 0, -100, 10, -9];

	for (const [i, id] of ids.entries()) {
		const newContainer: Container = { id, values: [] };
		assert(!tree.has(newContainer));
		assert(tree.insert(newContainer));
		newContainer.values.push(i - 1, i, i + 1);
		assert(tree.has({ id, values: [] }));
		assert.equal(tree.size, i + 1);
	}

	for (const id of ids) {
		const newContainer: Container = { id, values: [] };
		assert(tree.has({ id } as Container));
		assert(!tree.insert(newContainer));
		assert(tree.has({ id, values: [] }));
		assert.equal(tree.size, ids.length);
	}

	assert.deepEqual(
		[...tree].map(container => container.id),
		[-100, -10, -9, -1, 0, 1, 9, 10, 100],
	);
	assert.equal(tree.size, ids.length);

	const expected: number[] = [-100, -10, -9, -1, 0, 1, 9, 10, 100];
	for (const [i, id] of ids.entries()) {
		assert.equal(tree.size, ids.length - i);
		assert(tree.has({ id, values: [] }));

		assert(tree.remove({ id, values: [] }));
		expected.splice(expected.indexOf(id), 1);
		assert.deepEqual(
			[...tree].map(container => container.id),
			expected,
		);
		assert(!tree.has({ id, values: [] }));

		assert(!tree.remove({ id, values: [] }));
		assert.deepEqual(
			[...tree].map(container => container.id),
			expected,
		);
		assert(!tree.has({ id, values: [] }));
	}

	assert.equal(tree.size, 0);
});

test("[collections/BinarySearchTree] from Iterable", () => {
	const values: number[] = [-10, 9, -1, 100, 9, 1, 0, 9, -100, 10, -9];
	const originalValues: number[] = Array.from(values);
	const expected: number[] = [-100, -10, -9, -1, 0, 1, 9, 10, 100];
	let tree: BinarySearchTree<number> = BinarySearchTree.from(values);
	assert.deepEqual(values, originalValues);
	assert.deepEqual([...tree], expected);
	assert.deepEqual(
		[...tree.nlrValues()],
		[-10, -100, 9, -1, -9, 1, 0, 100, 10],
	);
	assert.deepEqual(
		[...tree.lvlValues()],
		[-10, -100, 9, -1, 100, -9, 1, 10, 0],
	);

	tree = BinarySearchTree.from(values, descend);
	assert.deepEqual(values, originalValues);
	assert.deepEqual([...tree].reverse(), expected);
	assert.deepEqual(
		[...tree.nlrValues()],
		[-10, 9, 100, 10, -1, 1, 0, -9, -100],
	);
	assert.deepEqual(
		[...tree.lvlValues()],
		[-10, 9, -100, 100, -1, 10, 1, -9, 0],
	);
});

test("[collections/BinarySearchTree] from BinarySearchTree with default ascend comparator", () => {
	const values: number[] = [-10, 9, -1, 100, 9, 1, 0, 9, -100, 10, -9];
	const expected: number[] = [-100, -10, -9, -1, 0, 1, 9, 10, 100];
	const originalTree = new BinarySearchTree<number>();
	for (const value of values) originalTree.insert(value);
	let tree: BinarySearchTree<number> = BinarySearchTree.from(originalTree);
	assert.deepEqual([...originalTree], expected);
	assert.deepEqual([...tree], expected);
	assert.deepEqual([...tree.nlrValues()], [...originalTree.nlrValues()]);
	assert.deepEqual([...tree.lvlValues()], [...originalTree.lvlValues()]);

	tree = BinarySearchTree.from(originalTree, descend);
	assert.deepEqual([...originalTree], expected);
	assert.deepEqual([...tree].reverse(), expected);
	assert.deepEqual([...tree.nlrValues()], expected);
	assert.deepEqual([...tree.lvlValues()], expected);
});

test("[collections/BinarySearchTree] from BinarySearchTree with descend comparator", () => {
	const values: number[] = [-10, 9, -1, 100, 9, 1, 0, 9, -100, 10, -9];
	const expected: number[] = [100, 10, 9, 1, 0, -1, -9, -10, -100];
	const originalTree = new BinarySearchTree<number>(descend);
	for (const value of values) originalTree.insert(value);
	let tree: BinarySearchTree<number> = BinarySearchTree.from(originalTree);
	assert.deepEqual([...originalTree], expected);
	assert.deepEqual([...tree], expected);
	assert.deepEqual([...tree.nlrValues()], [...originalTree.nlrValues()]);
	assert.deepEqual([...tree.lvlValues()], [...originalTree.lvlValues()]);

	tree = BinarySearchTree.from(originalTree, ascend);
	assert.deepEqual([...originalTree], expected);
	assert.deepEqual([...tree].reverse(), expected);
	assert.deepEqual([...tree.nlrValues()], expected);
	assert.deepEqual([...tree.lvlValues()], expected);
});

test("[collections/BinarySearchTree] README example", () => {
	const values = [3, 10, 13, 4, 6, 7, 1, 14];
	const tree = new BinarySearchTree<number>();
	for (const value of values) tree.insert(value);
	assert.deepEqual([...tree], [1, 3, 4, 6, 7, 10, 13, 14]);
	assert.equal(tree.min(), 1);
	assert.equal(tree.max(), 14);
	assert(!tree.has(42));
	assert(tree.has(7));
	assert(!tree.remove(42));
	assert(tree.remove(7));
	assert.deepEqual([...tree], [1, 3, 4, 6, 10, 13, 14]);

	const invertedTree = new BinarySearchTree<number>(descend);
	for (const value of values) invertedTree.insert(value);
	assert.deepEqual([...invertedTree], [14, 13, 10, 7, 6, 4, 3, 1]);
	assert.equal(invertedTree.min(), 14);
	assert.equal(invertedTree.max(), 1);
	assert(!invertedTree.has(42));
	assert(invertedTree.has(7));
	assert(!invertedTree.remove(42));
	assert(invertedTree.remove(7));
	assert.deepEqual([...invertedTree], [14, 13, 10, 6, 4, 3, 1]);

	const words = new BinarySearchTree<string>(
		(a, b) => ascend(a.length, b.length) || ascend(a, b),
	);
	for (const value of [
		"truck",
		"car",
		"helicopter",
		"tank",
		"train",
		"suv",
		"semi",
		"van",
	])
		words.insert(value);
	assert.deepEqual(
		[...words],
		["car", "suv", "van", "semi", "tank", "train", "truck", "helicopter"],
	);
	assert.equal(words.min(), "car");
	assert.equal(words.max(), "helicopter");
	assert(!words.has("scooter"));
	assert(words.has("tank"));
	assert(!words.remove("scooter"));
	assert(words.remove("tank"));
	assert.deepEqual(
		[...words],
		["car", "suv", "van", "semi", "train", "truck", "helicopter"],
	);
});

test("[collections/BinarySearchTree] nully .max() and .clear()", () => {
	const tree = BinarySearchTree.from([1]);
	assert(tree.size);
	tree.clear();
	assert(!tree.size);
	assert(!tree.max());
});

test("[collections/BinarySearchTree] .rotateNode()", () => {
	class MyTree<T> extends BinarySearchTree<T> {
		rotateNode2() {
			return super.rotate(this.root!, "right");
		}
	}
	const tree = new MyTree();
	tree.insert(1);
	assert(!tree.rotateNode2());
});
