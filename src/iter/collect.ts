/**
 * Collects the items in an iterable into an array
 * @param iter
 * @returns an array of the items in the iterable
 */
export function collect<T>(iter: Iterable<T>): T[] {
  return [...iter];
}
