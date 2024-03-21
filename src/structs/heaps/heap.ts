import { swap } from "../../array.ts";
import { type Compare } from "../../cmp.ts";
import { uint } from "../../types.ts";

/**
 * ## Binary Heap
 * A tree in which any given node is the max or min of its children
 *
 * | Method      | Average Case | Worst Case |
 * | ----------- | ------------ | ---------- |
 * | peek()      | O(1)         | O(1)       |
 * | pop()       | O(log n)     | O(log n)   |
 * | push(value) | O(1)         | O(log n)   |
 *
 * @see https://en.wikipedia.org/wiki/Heap_(data_structure)
 */
export class Heap<T> implements Iterable<T> {
  data: T[];

  constructor(
    readonly compare: Compare<T>,
    data: T[] = [],
    heapify = true,
  ) {
    if (heapify) {
      this.data = [];
      this.push(...data);
    } else this.data = data;
  }

  get length(): uint {
    return this.data.length;
  }

  get height(): uint {
    return Math.floor(Math.log2(this.length)) + 1;
  }

  valueOf(): T | undefined {
    return this.peek();
  }

  copy(): Heap<T> {
    return new Heap(this.compare, [...this.data], false);
  }

  /**
   * Returns the first value in the heap
   */
  peek(): T | undefined {
    return this.data[0];
  }

  /**
   * Removes the first value from the heap and returns it
   */
  pop(): T | undefined {
    const first = this.data[0];
    swap(this.data, 0, this.length - 1);
    this.data.pop();
    this.heapify();
    return first;
  }

  /**
   * Inserts values into the heap and makes sure the first value is the min/max
   * @param value
   * @returns The new length of the heap
   */
  push(...values: T[]): uint {
    const { data, compare } = this;
    for (const value of values) {
      data.push(value);
      let i = data.length - 1;
      let parent = Math.floor((i - 1) / 2);
      while (i > 0 && compare(data[i]!, data[parent]!) < 0) {
        swap(data, i, parent);
        i = parent;
        parent = Math.floor((i - 1) / 2);
      }
    }

    return data.length;
  }

  *drain(): Generator<T> {
    while (this.length) {
      yield this.pop() as T;
    }
  }

  [Symbol.iterator](): Iterator<T> {
    return this.data.values();
  }

  protected heapify(i = 0): void {
    const { length, compare, data } = this;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;
    if (left < length && compare(data[left]!, data[largest]!) < 0) {
      largest = left;
    }
    if (right < length && compare(data[right]!, data[largest]!) < 0) {
      largest = right;
    }
    if (largest !== i) {
      swap(data, i, largest);
      this.heapify(largest);
    }
  }
}
