import { expectTypeOf, test } from "vitest";
import { filter } from "./filter";

test(() => {
	const iter = [1, "cat", 2, "dog"];
	const filtered = filter(iter, (x): x is number => typeof x === "number");
	expectTypeOf([...filtered]).toEqualTypeOf<number[]>();
});

test(() => {
	const iter = [1, "cat", 2, "dog", false] as const;
	const filtered = filter(iter, Boolean);
	expectTypeOf([...filtered]).toEqualTypeOf<Array<1 | "cat" | 2 | "dog">>();
});
