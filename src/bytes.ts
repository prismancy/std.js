/**
 * @module
 * Utilities for working with binary data
 */

import { type uint } from "./types";

/**
 * Convert binary into its hex representation
 * @param buffer
 * @returns hex string
 * @example
 * ```ts
 * const buffer = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
 * console.log(hex(buffer)); // "48656c6c6f"
 * ```
 */
export function hex(buffer: Iterable<uint>): string {
  const hexCodes: string[] = [];
  for (const element of buffer) {
    hexCodes.push(element.toString(16).padStart(2, "0"));
  }

  return hexCodes.join("");
}

/**
 * Convert a hex string into binary
 * @param hex
 * @returns uint8 buffer
 * @example
 * ```ts
 * const buffer = unhex("48656c6c6f");
 * console.log(buffer); // Uint8Array [ 72, 101, 108, 108, 111 ]
 */
export function unhex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }

  return bytes;
}

/**
 * Counts the number of bits set to 1 in an integer
 * @param n the integer to count the bits of
 * @returns the number of bits set to 1
 * @example
 * ```ts
 * console.log(popcnt(0b1010)); // 2
 * console.log(popcnt(0b1111)); // 4
 * console.log(popcnt(0b10000000000000000000000000000000)); // 1
 * ```
 */
export function popcnt(n: uint): uint {
  let count = 0;
  while (n) {
    n &= n - 1;
    count++;
  }

  return count;
}
