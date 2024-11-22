/**
 * @module
 * Functions for working with numbers
 */

import { pipe } from "./fn/pipe";
import { collect, filter, map, tee } from "./iter";

/**
 * Returns the minimum value in an iterable of numbers
 * @param iter The iterable of numbers
 * @returns The minimum value
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4, 5];
 * const minValue = min(numbers);
 * console.log(minValue); // 1
 * ```
 */
export function min(iter: Iterable<number>): number {
  let min = Number.POSITIVE_INFINITY;
  for (const value of iter) {
    if (value < min) min = value;
  }

  return min;
}

/**
 * Returns the maximum value in an iterable of numbers
 * @param iter The iterable of numbers
 * @returns The maximum value
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4, 5];
 * const maxValue = max(numbers);
 * console.log(maxValue); // 5
 * ```
 */
export function max(iter: Iterable<number>): number {
  let max = Number.NEGATIVE_INFINITY;
  for (const value of iter) {
    if (value > max) max = value;
  }

  return max;
}

/**
 * Returns the minimum and maximum values in an iterable of numbers
 * @param iter The iterable of numbers
 * @returns A tuple containing the minimum and maximum values
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4, 5];
 * const [min, max] = minmax(numbers);
 * console.log(min); // 1
 * console.log(max); // 5
 * ```
 */
export function minmax(iter: Iterable<number>): [min: number, max: number] {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (const value of iter) {
    if (value < min) min = value;
    if (value > max) max = value;
  }

  return [min, max];
}

/**
 * Returns the sum of an iterable of numbers
 * @param iter The iterable of numbers
 * @returns The sum
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4, 5];
 * const total = sum(numbers);
 * console.log(total); // 15
 * ```
 */
export function sum(iter: Iterable<number>): number {
  let total = 0;
  for (const value of iter) {
    total += value;
  }

  return total;
}

/**
 * Returns each number in an iterable multiplied together. If the iterable is empty, returns 1.
 * @param iter The iterable of numbers
 * @returns The product
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4, 5];
 * const product = product(numbers);
 * console.log(product); // 120
 * ```
 */
export function product(iter: Iterable<number>): number {
  let total = 1;
  for (const value of iter) {
    total *= value;
  }

  return total;
}

/**
 * Returns the average of an iterable of numbers
 * @param iter The iterable of numbers
 * @returns The average
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4, 5];
 * const average = avg(numbers);
 * console.log(average); // 3
 * ```
 */
export function avg(iter: Iterable<number>): number {
  let total = 0;
  let count = 0;
  for (const value of iter) {
    total += value;
    count++;
  }

  return total / count;
}

/**
 * Returns the median, or middle, of an array of numbers, or 0 if the array is empty.
 * @param array The array of numbers
 * @returns The median
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4, 5];
 * const median = median(numbers);
 * console.log(median); // 3
 *
 * const numbers2 = [1, 2, 3, 4, 5, 6];
 * const median2 = median(numbers2);
 * console.log(median2); // 3.5
 * ```
 */
export function median(array: number[]): number {
  const { length } = array;
  if (!length) return 0;
  const sorted = [...array].sort((a, b) => a - b);
  if (length % 2) return sorted[length / 2]!;
  return (sorted[length / 2 - 1]! + sorted[length / 2]!) / 2;
}

/**
 * Returns the mode, or most common, elements of an iterable
 * @param iter The iterable of numbers
 * @returns The mode
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 3, 4, 5, 5, 5];
 * const mode = mode(numbers);
 * console.log(mode); // [5]
 *
 * const numbers2 = [1, 2, 3, 3, 4, 5, 5];
 * const mode2 = mode(numbers2);
 * console.log(mode2); // [3, 5]
 * ```
 */
export function mode<T>(iter: Iterable<T>): T[] {
  const counts = new Map<T, number>();
  for (const n of iter) {
    const count = counts.get(n) || 0;
    counts.set(n, count + 1);
  }

  const maxCount = max(counts.values());
  return pipe(
    counts,
    filter(([_, count]) => count === maxCount),
    map(([n]) => n),
    collect,
  );
}

/**
 * Returns the variance of an iterable of numbers
 * @param iter The iterable of numbers
 * @returns The variance
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4, 5];
 * const variance = variance(numbers);
 * console.log(variance); // 2.5
 * ```
 */
export function variance(iter: Iterable<number>): number {
  const [a, b] = tee(iter);
  const m = avg(a);
  return avg(
    map(b, (n) => {
      const d = n - m;
      return d * d;
    }),
  );
}

/**
 * Returns the standard deviation of an iterable of numbers
 * @param iter The iterable of numbers
 * @returns The standard deviation
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4, 5];
 * const stddev = stddev(numbers);
 * console.log(stddev); // 1.5811388300841898
 * ```
 */
export function stddev(iter: Iterable<number>): number {
  return Math.sqrt(variance(iter));
}

/**
 * Returns the mean absolute deviation of an iterable of numbers
 * @param iter The iterable of numbers
 * @returns The mean absolute deviation
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4, 5];
 * const mad = meanAbsDev(numbers);
 * console.log(mad); // 1.2
 * ```
 */
export function meanAbsDev(iter: Iterable<number>): number {
  const [a, b] = tee(iter);
  const m = avg(a);
  return avg(map(b, (n) => n - m));
}
