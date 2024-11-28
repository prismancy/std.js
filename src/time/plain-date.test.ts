import { expect, test } from "vitest";
import { PlainDate } from "./plain-date";

test("fromString", () => {
  const date = PlainDate.fromString("2020-03-14");
  expect(date.year).toBe(2020);
  expect(date.month).toBe(3);
  expect(date.day).toBe(14);
});

test("fromDate", () => {
  const piDate = new Date(2020, 2, 14);
  const date = PlainDate.fromDate(piDate);
  expect(date.year).toBe(2020);
  expect(date.month).toBe(3);
  expect(date.day).toBe(14);
});

test("until", () => {
  const date1 = PlainDate.fromString("2020-03-14");
  const date2 = PlainDate.fromString("2021-06-28");
  const duration = date1.until(date2);
  expect(duration.years).toBe(1);
  expect(duration.months).toBe(3);
  expect(duration.days).toBe(14);
});

test("since", () => {
  const date1 = PlainDate.fromString("2020-03-14");
  const date2 = PlainDate.fromString("2021-06-28");
  const duration = date2.since(date1);
  expect(duration.years).toBe(1);
  expect(duration.months).toBe(3);
  expect(duration.days).toBe(14);
});

test("add", () => {
  const date1 = PlainDate.fromString("2020-03-14");
  const date2 = date1.add({ years: 1, months: 3, days: 14 });
  expect(date2.year).toBe(2021);
  expect(date2.month).toBe(6);
  expect(date2.day).toBe(28);
});

test("add", () => {
  const date1 = PlainDate.fromString("2020-03-14");
  const date2 = date1.subtract({ years: 1, months: 2, days: 10 });
  expect(date2.year).toBe(2019);
  expect(date2.month).toBe(1);
  expect(date2.day).toBe(4);
});
