/**
 * A queue is a data structure that follows a first-in-first-out (FIFO) order
 *
 * | Method      | Average Case | Worst Case |
 * | ----------- | ------------ | ---------- |
 * | enqueue()   | O(1)         | O(1)       |
 * | dequeue()   | O(1)         | O(1)       |
 *
 * @see https://en.wikipedia.org/wiki/Queue_(abstract_data_type)
 */
export class Queue<T> {
	constructor(protected items: T[] = []) {}

	get size() {
		return this.items.length;
	}

	enqueue(item: T) {
		this.items.push(item);
	}

	dequeue() {
		return this.items.shift();
	}

	*[Symbol.iterator](): IterableIterator<T> {
		let item: T | undefined;
		while ((item = this.dequeue())) {
			yield item;
		}
	}
}
