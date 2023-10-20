import { expect, test } from "vitest";
import { every, filter } from "../iter";
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

test(() => {
	const array = [1, 2, 3, 4, 5];
	const gotEven = pipe(
		array,
		filter(x => x % 2 === 0),
		every(x => x % 2 === 0),
	);
	expect(gotEven);
});
