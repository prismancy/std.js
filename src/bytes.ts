import { type uint } from "./types.ts";

/**
 * Convert binary into its hex representation
 * @param buffer
 * @returns hex string
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
 */
export function popcnt(n: uint): uint {
	let count = 0;
	while (n) {
		n &= n - 1;
		count++;
	}

	return count;
}
