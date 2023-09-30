import { bench } from "vitest";
import { SortedArray } from "./sorted-array";

const array = Array.from({ length: 1_000_000 }, (_, i) => i);
const sortedArray = new SortedArray([...array]);

bench("linear", () => {
	array.includes(500_001);
});

bench("binary", () => {
	sortedArray.has(500_001);
});
