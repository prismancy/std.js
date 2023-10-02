import { ascend } from "../cmp";

/**
 * ## Sorted Array
 * An array that maintains sorted order
 *
 * | Method         | Average Case | Worst Case |
 * | -------------- | ------------ | ---------- |
 * | indexOf(value) | O(log n)     | O(log n)   |
 * | has(value)     | O(log n)     | O(log n)   |
 * | push(value)    | O(n)         | O(n)       |
 *
 * @see https://en.wikipedia.org/wiki/Sorted_array
 */
export class SortedArray<T> implements Iterable<T> {
	constructor(
		private readonly data: T[] = [],
		readonly compare = ascend,
		sort = true,
	) {
		if (sort) this.data.sort(compare);
	}

	*[Symbol.iterator](): IterableIterator<T> {
		yield* this.data.values();
	}

	at(index: number) {
		return this.data[index];
	}

	copy() {
		return new SortedArray([...this.data], this.compare, false);
	}

	/**
	 * Returns the index of the value if it exists, otherwise -1
	 * @param value
	 */
	indexOf(value: T) {
		const { data } = this;
		let low = 0;
		let high = data.length - 1;
		while (low <= high) {
			const mid = Math.floor((low + high) / 2);
			const cmp = this.compare(value, data[mid]!);
			if (cmp < 0) high = mid - 1;
			else if (cmp > 0) low = mid + 1;
			else return mid;
		}

		return -1;
	}

	/**
	 * Returns if the array has the value
	 * @param value
	 */
	has(value: T) {
		// eslint-disable-next-line unicorn/prefer-includes
		return this.indexOf(value) !== -1;
	}

	/**
	 * Binary inserts a value into the array while maintaining sorted order
	 * @param value
	 */
	push(value: T) {
		const { data, compare } = this;

		let low = 0;
		let high = data.length - 1;
		while (low <= high) {
			const mid = Math.floor((low + high) / 2);
			if (compare(value, data[mid]!) < 0) high = mid - 1;
			else low = mid + 1;
		}

		data.splice(low, 0, value);
	}
}
