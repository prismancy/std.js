import { describe, expect, test } from "vitest";
import {
	changes,
	chunk,
	difference,
	includesAll,
	includesAny,
	intersection,
	swap,
	union,
	unzip,
	zip,
} from "./array";

describe("zip", () => {
	test("same length", () => {
		const array1 = [1, 2, 3, 4, 5];
		const array2 = ["a", "b", "c", "d", "e"];
		const zipped = zip(array1, array2);
		expect(zipped).toEqual([
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
		expect(zipped).toEqual([
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
		expect(zipped).toEqual([
			[1, "a"],
			[2, "b"],
			[3, "c"],
			[4, "d"],
			[5, "e"],
		]);
	});
});

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

test("swap", () => {
	const array = [1, 2, 3, 4, 5];
	swap(array, 0, 4);
	expect(array).toEqual([5, 2, 3, 4, 1]);
	swap(array, 0, 2);
	expect(array).toEqual([3, 2, 5, 4, 1]);
});

test("chunk", () => {
	const array = [1, 2, 3, 4, 5];
	expect(chunk(array, 2)).toEqual([[1, 2], [3, 4], [5]]);
	expect(chunk(array, 3)).toEqual([
		[1, 2, 3],
		[4, 5],
	]);
});

test("intersection", () => {
	const array1 = [1, 2, 3, 4, 5];
	const array2 = [-1, 0, 1, 2, 5];
	expect(intersection(array1, array2)).toEqual([1, 2, 5]);
});

test("changes", () => {
	const oldArray = [1, 2, 3, 4, 5];
	const newArray = [-1, 0, 1, 2, 5];
	const [added, removed] = changes(oldArray, newArray);
	expect(added).toEqual([-1, 0]);
	expect(removed).toEqual([3, 4]);
});

test("difference", () => {
	const array1 = [1, 2, 3, 4, 5];
	const array2 = [-1, 0, 1, 2, 5];
	const diff = difference(array1, array2);
	expect(diff).toEqual([-1, 0, 3, 4]);
});

test("union", () => {
	const array1 = [1, 2, 3, 4, 5];
	const array2 = [-1, 0, 1, 2, 5];
	expect(union(array1, array2)).toEqual([1, 2, 3, 4, 5, -1, 0]);
});

test("includesAny", () => {
	const array = [1, 2, 3, 4, 5];
	expect(includesAny(array, [1, 2, 3])).toBe(true);
	expect(includesAny(array, [1, 2, 3, 6])).toBe(true);
	expect(includesAny(array, [6, 7, 8])).toBe(false);
	expect(includesAny(array, [])).toBe(false);
});

test("includesAll", () => {
	const array = [1, 2, 3, 4, 5];
	expect(includesAll(array, [1, 2, 3])).toBe(true);
	expect(includesAll(array, [1, 2, 3, 6])).toBe(false);
	expect(includesAll(array, [6, 7, 8])).toBe(false);
	expect(includesAll(array, [])).toBe(true);
});
