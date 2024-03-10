import { expectTypeOf, test } from "vitest";
import { range } from "./range";
import { tee } from "./tee";

test("n: 0", () => {
	const iter = range(0);
	const iters = tee(iter, 0);
	expectTypeOf(iters).toEqualTypeOf<[]>();
});

test("n: 1", () => {
	const iter = range(0);
	const iters = tee(iter, 1);
	expectTypeOf(iters).toEqualTypeOf<[IterableIterator<number>]>();
});

test("n: 3", () => {
	const iter = range(0);
	const iters = tee(iter, 3);
	expectTypeOf(iters).toEqualTypeOf<
		[
			IterableIterator<number>,
			IterableIterator<number>,
			IterableIterator<number>,
		]
	>();
});

test("n: number", () => {
	const iter = range(0);
	const iters = tee(iter, 3 as number);
	expectTypeOf(iters).toEqualTypeOf<Array<IterableIterator<number>>>();
});
