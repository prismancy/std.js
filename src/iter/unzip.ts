import { dual } from "../fn";

export const unzip: {
  <T, U>(iterable: Iterable<readonly [T, U]>): [T[], U[]];
  <T, U>(): (iterable: Iterable<readonly [T, U]>) => [T[], U[]];
} = dual(<T, U>(iterable: Iterable<readonly [T, U]>): [T[], U[]] => {
  const array1: T[] = [];
  const array2: U[] = [];
  let i = 0;
  for (const [a, b] of iterable) {
    array1[i] = a;
    array2[i] = b;
    i++;
  }

  return [array1, array2];
});
