import { expect, test } from "vitest";
import { pipe } from "./pipe";

test(() => {
	const add = (x: number) => (y: number) => x + y;
	const double = (x: number) => x * 2;
	const addThenDouble = pipe(2, add(1), double);
	expect(addThenDouble).toBe(6);
});

test(() => {
	const add = (x: number) => (y: number) => x + y;
	const addThenDouble = pipe(2, add(1));
	expect(addThenDouble).toBe(3);
});

test(() => {
	const add = (x: number) => (y: number) => x + y;
	const addThenDouble = pipe(2, add(1), add(2));
	expect(addThenDouble).toBe(5);
});
