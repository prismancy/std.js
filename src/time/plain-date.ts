import { addDuration, since, subtractDuration, until } from "./date";
import { type DurationLike } from "./duration";

/** @unstable */
export class PlainDate {
  constructor(
    public year: number,
    public month: number,
    public day: number,
  ) {}

  toString() {
    return `${this.year}-${this.month}-${this.day}`;
  }
  static fromString(str: string) {
    const [yearStr, monthStr, dayStr] = str.split("-");
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);
    const day = parseInt(dayStr);
    return new PlainDate(year, month, day);
  }

  toDate() {
    return new Date(this.year, this.month - 1, this.day);
  }
  static fromDate(date: Date) {
    return new PlainDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    );
  }

  valueOf() {
    return this.toDate().getTime();
  }

  static now() {
    return PlainDate.fromDate(new Date());
  }

  until(date: PlainDate) {
    return until(this.toDate(), date.toDate());
  }

  since(date: PlainDate) {
    return since(this.toDate(), date.toDate());
  }

  add(units: DurationLike) {
    const date = this.toDate();
    const resultDate = addDuration(date, units);
    return PlainDate.fromDate(resultDate);
  }

  subtract(units: DurationLike) {
    const date = this.toDate();
    const resultDate = subtractDuration(date, units);
    return PlainDate.fromDate(resultDate);
  }
}
