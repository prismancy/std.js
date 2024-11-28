import { HOUR, MINUTE, SECOND } from "./consts";
import { addDuration, getToday, since, subtractDuration, until } from "./date";
import { type DurationLike } from "./duration";

export class PlainTime {
  constructor(
    public hour = 0,
    public minute = 0,
    public second = 0,
    public millisecond = 0,
  ) {}

  toString() {
    return `${this.hour.toString().padStart(2, "0")}:${this.minute.toString().padStart(2, "0")}:${this.second.toString().padStart(2, "0")}.${this.millisecond.toString().padStart(3, "0")}`;
  }
  static fromString(str: string) {
    const [yearStr, monthStr, dayStr] = str.split("-");
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);
    const day = parseInt(dayStr);
    return new PlainTime(year, month, day);
  }

  toDate() {
    const today = getToday();
    today.setHours(this.hour);
    today.setMinutes(this.minute);
    today.setSeconds(this.second);
    today.setMilliseconds(this.millisecond);
    return today;
  }
  static fromDate(date: Date) {
    return new PlainTime(
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    );
  }

  valueOf() {
    return (
      this.hour * HOUR +
      this.minute * MINUTE +
      this.second * SECOND +
      this.millisecond
    );
  }

  static now() {
    return PlainTime.fromDate(new Date());
  }

  until(time: PlainTime) {
    return until(this.toDate(), time.toDate());
  }

  since(time: PlainTime) {
    return since(this.toDate(), time.toDate());
  }

  add(units: DurationLike) {
    const date = this.toDate();
    const resultDate = addDuration(date, units);
    return PlainTime.fromDate(resultDate);
  }

  subtract(units: DurationLike) {
    const date = this.toDate();
    const resultDate = subtractDuration(date, units);
    return PlainTime.fromDate(resultDate);
  }
}
