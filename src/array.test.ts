import { expect, test } from "vitest";
import {
	changes,
	chunk,
	difference,
	includesAll,
	includesAny,
	intersection,
	swap,
	union,
} from "./array";

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
