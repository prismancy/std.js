import { WEEK, DAY, HOUR, SECOND, MINUTE } from "./consts";

export interface DurationLike {
  readonly years?: number;
  readonly months?: number;
  readonly weeks?: number;
  readonly days?: number;
  readonly hours?: number;
  readonly minutes?: number;
  readonly seconds?: number;
  readonly milliseconds?: number;
}

export type DurationUnit = keyof DurationLike;

const MONTH = DAY * 30;
const YEAR = DAY * 365;

export class Duration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;

  constructor(units?: DurationLike) {
    this.years = units?.years || 0;
    this.months = units?.months || 0;
    this.days = (units?.weeks || 0) * 7 + (units?.days || 0);
    this.hours = units?.hours || 0;
    this.minutes = units?.minutes || 0;
    this.seconds = units?.seconds || 0;
    this.milliseconds = units?.milliseconds || 0;
  }

  valueOf() {
    return this.as("milliseconds");
  }

  toString() {
    const parts: string[] = [];
    if (this.years) parts.push(`${this.years}Y`);
    if (this.months) parts.push(`${this.months}M`);
    if (this.days) parts.push(`${this.days}D`);
    if (this.hours) parts.push(`${this.hours}h`);
    if (this.minutes) parts.push(`${this.minutes}m`);
    if (this.seconds) parts.push(`${this.seconds}s`);
    if (this.milliseconds) parts.push(`${this.milliseconds}ms`);
    return parts.join(" ") || "0ms";
  }

  static fromMillis(ms: number) {
    const milliseconds = ms % 1000;
    const seconds = Math.floor(ms / SECOND) % 60;
    const minutes = Math.floor(ms / MINUTE) % 60;
    const hours = Math.floor(ms / HOUR) % 24;
    const days = Math.floor(ms / DAY) % 365;
    const years = Math.floor(ms / YEAR);

    return new Duration({
      years,
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    });
  }

  as(unit: DurationUnit) {
    const { years, days, hours, minutes, seconds, milliseconds } = this;
    const denominator =
      unit === "years" ? YEAR
      : unit === "months" ? MONTH
      : unit === "weeks" ? WEEK
      : unit === "days" ? DAY
      : unit === "hours" ? HOUR
      : unit === "minutes" ? MINUTE
      : unit === "seconds" ? SECOND
      : 1;
    return (
      years * (YEAR / denominator) +
      days * (DAY / denominator) +
      hours * (HOUR / denominator) +
      minutes * (MINUTE / denominator) +
      seconds * (SECOND / denominator) +
      milliseconds / denominator
    );
  }
}
