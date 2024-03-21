export interface DurationLike {
  readonly years?: number;
  readonly days?: number;
  readonly hours?: number;
  readonly minutes?: number;
  readonly seconds?: number;
  readonly milliseconds?: number;
}

export type DurationUnit = keyof DurationLike | "weeks" | "months";

export const SECONDS = 1000;
export const MINUTES = 60 * SECONDS;
export const HOURS = 60 * MINUTES;
export const DAYS = 24 * HOURS;
export const WEEKS = 7 * DAYS;
export const MONTHS = 30 * DAYS;
export const YEARS = 365 * DAYS;

export class Duration {
  years = 0;
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;

  constructor(units?: DurationLike) {
    if (units) {
      this.years = units.years || 0;
      this.days = units.days || 0;
      this.hours = units.hours || 0;
      this.minutes = units.minutes || 0;
      this.seconds = units.seconds || 0;
      this.milliseconds = units.milliseconds || 0;
    }
  }

  valueOf(): number {
    return this.as("milliseconds");
  }

  toString(): string {
    const parts: string[] = [];
    if (this.years) parts.push(`${this.years}y`);
    if (this.days) parts.push(`${this.days}d`);
    if (this.hours) parts.push(`${this.hours}h`);
    if (this.minutes) parts.push(`${this.minutes}m`);
    if (this.seconds) parts.push(`${this.seconds}s`);
    if (this.milliseconds) parts.push(`${this.milliseconds}ms`);
    return parts.join(" ") || "0ms";
  }

  static fromMillis(ms: number): Duration {
    const milliseconds = ms % 1000;
    const seconds = Math.floor(ms / SECONDS) % 60;
    const minutes = Math.floor(ms / MINUTES) % 60;
    const hours = Math.floor(ms / HOURS) % 24;
    const days = Math.floor(ms / DAYS) % 365;
    const years = Math.floor(ms / YEARS);

    return new Duration({
      years,
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    });
  }

  as(unit: DurationUnit): number {
    const { years, days, hours, minutes, seconds, milliseconds } = this;
    const denominator = unit === "years"
      ? YEARS
      : unit === "months"
      ? MONTHS
      : unit === "weeks"
      ? WEEKS
      : unit === "days"
      ? DAYS
      : unit === "hours"
      ? HOURS
      : unit === "minutes"
      ? MINUTES
      : unit === "seconds"
      ? SECONDS
      : 1;
    return (
      years * (YEARS / denominator) +
      days * (DAYS / denominator) +
      hours * (HOURS / denominator) +
      minutes * (MINUTES / denominator) +
      seconds * (SECONDS / denominator) +
      milliseconds / denominator
    );
  }
}
