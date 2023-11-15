import { swap } from "../array";

/**
 * ## Unordered Array
 * An array that maintains no order
 */
export class UnorderedArray<T> extends Array<T> {
	copy() {
		return new UnorderedArray(...this);
	}

	/**
	 * Inserts new elements at the end of an unordered array, and returns the new length of the unordered array.
	 * @param items Elements to insert at the end of the array.
	 */
	override unshift(...items: T[]): number {
		return super.push(...items);
	}

	/**
	 * Removes the last element from an array and returns it.
	 * If the array is empty, undefined is returned and the array is not modified.
	 */
	override shift(): T | undefined {
		return super.pop();
	}

	/**
	 * Removes an item by index
	 * @param index the index of the item to remove
	 * @returns the removed item, if it exists
	 */
	removeIndex(index: number) {
		swap(this, index, this.length - 1);
		return this.pop();
	}

	override splice(
		start: number,
		deleteCount = this.length - start,
		...items: T[]
	): T[] {
		const spliced: T[] = [];
		for (let i = 0; i < deleteCount; i++) {
			const replacement = items[i];
			let removed: T | undefined;
			if (replacement) {
				removed = this[start + i];
				this[start + i] = replacement;
			} else {
				removed = this.removeIndex(start);
			}

			if (removed) spliced.push(removed);
		}

		return spliced;
	}

	override toSpliced(
		start: number,
		deleteCount = this.length - start,
		...items: T[]
	): T[] {
		const copy = this.copy();
		copy.splice(start, deleteCount, ...items);
		return copy;
	}
}
