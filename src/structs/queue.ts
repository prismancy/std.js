import { uint } from "../types";

/**
 * ## Queue
 * A data structure that follows a first-in-first-out (FIFO) order
 *
 * | Method      | Average Case | Worst Case |
 * | ----------- | ------------ | ---------- |
 * | enqueue()   | O(1)         | O(1)       |
 * | dequeue()   | O(1)         | O(1)       |
 *
 * @see https://en.wikipedia.org/wiki/Queue_(abstract_data_type)
 */
export class Queue<T> implements Iterable<T> {
  constructor(protected items: T[] = []) {}

  get size(): uint {
    return this.items.length;
  }

  enqueue(item: T): uint {
    return this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  *[Symbol.iterator](): Iterator<T> {
    let item: T | undefined;
    while ((item = this.dequeue())) {
      yield item;
    }
  }
}
