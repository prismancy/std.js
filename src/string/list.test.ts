import { expect, test } from "vitest";
import { listItems } from "./list";

test("no items", () => {
	expect(listItems([])).toBe("");
});

test("one item", () => {
	expect(listItems(["foo"])).toBe("foo");
});

test("two items", () => {
	expect(listItems(["foo", "bar"])).toBe("foo and bar");
});

test("three items", () => {
	expect(listItems(["foo", "bar", "baz"])).toBe("foo, bar, and baz");
});

test("custom conjunction", () => {
	expect(listItems(["foo", "bar", "baz"], "or")).toBe("foo, bar, or baz");
});
