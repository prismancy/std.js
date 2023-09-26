import { pickByKeys } from "./object";
import { randomInt } from "./random";
import { type AnyRecord } from "./types";

export function zip<T, U>(array1: T[], array2: U[]): Array<[T, U]> {
	const length = Math.min(array1.length, array2.length);
	const array = Array.from<[T, U]>({ length });
	for (let i = 0; i < length; i++) {
		array[i] = [array1[i]!, array2[i]!];
	}

	return array;
}

export function unzip<T, U>(array: Array<[T, U]>): [T[], U[]] {
	const array1 = Array.from<T>({ length: array.length });
	const array2 = Array.from<U>({ length: array.length });
	for (const [i, [a, b]] of array.entries()) {
		array1[i] = a;
		array2[i] = b;
	}

	return [array1, array2];
}

export function swap<T>(array: T[], i: number, j: number): T[] {
	[array[i], array[j]] = [array[j]!, array[i]!];
	return array;
}

export function shuffle<T>(array: T[]): T[] {
	for (let i = 0, { length } = array; i < length; i++) {
		const j = randomInt(i, length);
		swap(array, i, j);
	}

	return array;
}

export function remove<T>(array: T[], item: T): boolean {
	const index = array.indexOf(item);
	if (index === -1) return false;
	array.splice(index, 1);
	return true;
}

export function unorderedRemove<T>(array: T[], index: number): T[] {
	swap(array, index, array.length - 1);
	array.pop();
	return array;
}

export function chunk<T>(array: ConcatArray<T>, size: number): T[][] {
	const result: T[][] = [];
	for (let i = 0; i < array.length; i += size) {
		result.push(array.slice(i, i + size));
	}

	return result;
}

export function intersection<T>(array1: T[], array2: T[]): T[] {
	return array1.filter(item => array2.includes(item));
}

export function changes<T, U>(
	oldArray: readonly T[],
	newArray: readonly U[],
): [added: U[], removed: T[]] {
	return [
		newArray.filter(value => !oldArray.includes(value as unknown as T)),
		oldArray.filter(value => !newArray.includes(value as unknown as U)),
	];
}

export function difference<T>(array1: T[], array2: T[]): T[] {
	const [added, removed] = changes(array1, array2);
	return [...added, ...removed];
}

export function union<T>(array1: T[], array2: T[]): T[] {
	return [...array1, ...array2.filter(item => !array1.includes(item))];
}

export function sample<T>(array: T[], numberItems: number): T[] {
	if (!array.length || !numberItems) return [];
	return Array.from<T>({ length: numberItems }).map(
		() => array[randomInt(array.length)]!,
	);
}

export function pick<T extends AnyRecord, K extends keyof T>(
	array: readonly T[],
	key: K,
): Array<T[K]>;
export function pick<T extends AnyRecord, K extends keyof T>(
	array: readonly T[],
	keys: K[],
): Array<Pick<T, K>>;
export function pick<T extends AnyRecord, K extends keyof T>(
	array: readonly T[],
	keys: K | K[],
): Array<T[K]> | Array<Pick<T, K>> {
	if (Array.isArray(keys)) return array.map(item => pickByKeys(item, keys));
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return array.map(item => item[keys]);
}

export function arraysEqual<T>(a: T[], b: T[]) {
	if (a.length !== b.length) return false;
	for (const [item1, item2] of zip(a, b)) {
		if (item1 !== item2) return false;
	}

	return true;
}

export function includesAny<T, U>(a: T[], b: U[]) {
	return b.some(item => a.includes(item as unknown as T));
}

export function includesAll<T, U>(a: T[], b: U[]) {
	return b.every(item => a.includes(item as unknown as T));
}

export function dedupe<T extends { [K in keyof T]: T[K] }>(
	array: readonly T[],
	key: keyof T,
): T[] {
	const copy = [...array];
	const values = new Set<PropertyKey>();
	for (let i = copy.length - 1; i >= 0; i--) {
		const item = copy[i]!;
		const value = item[key];
		if (values.has(value)) copy.splice(i, 1);
		else values.add(value);
	}

	return copy;
}

export function associateBy<T extends AnyRecord, K extends keyof T>(
	array: readonly T[],
	key: K,
) {
	const map = new Map<T[K], T>();
	for (const item of array) {
		map[item[key]] = item;
	}

	return map;
}

export function groupBy<T extends AnyRecord, K extends keyof T>(
	array: readonly T[],
	key: K,
) {
	const groups = new Map<T[K], T[]>();
	for (const item of array) {
		const value = item[key];
		const group = groups.get(value);
		if (group) group.push(item);
		else groups.set(value, [item]);
	}

	return groups;
}

export function partition<T>(
	array: readonly T[],
	predicate: (item: T) => boolean,
): [pass: T[], fail: T[]] {
	const pass: T[] = [];
	const fail: T[] = [];
	for (const item of array) {
		if (predicate(item)) pass.push(item);
		else fail.push(item);
	}

	return [pass, fail];
}

export function count<T>(
	array: readonly T[],
	predicate: (item: T) => boolean = Boolean,
): number {
	let count = 0;
	for (const item of array) {
		if (predicate(item)) count++;
	}

	return count;
}

export function filterByKey<T>(array: readonly T[], key: keyof T) {
	return array.filter(item => item[key]);
}
