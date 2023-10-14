import { expect, test } from "vitest";
import { serial } from "./serial";

test("increases", () => {
	const id1 = serial();
	expect(id1).toBe(1);
	const id2 = serial();
	expect(id2).toBe(2);
	const id3 = serial();
	expect(id3).toBe(3);
});
