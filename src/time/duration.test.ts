import { expect, test } from "vitest";
import { Duration } from "./duration";

test("all zeros", () => {
  const duration = new Duration();
  expect(duration.as("years")).toBe(0);
  expect(duration.as("days")).toBe(0);
  expect(duration.as("hours")).toBe(0);
  expect(duration.as("minutes")).toBe(0);
  expect(duration.as("seconds")).toBe(0);
  expect(duration.as("milliseconds")).toBe(0);
});
