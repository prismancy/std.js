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

	valueOf() {
		return this.as("milliseconds");
	}

	toString() {
		return `${this.years}y ${this.days}d ${this.hours}h ${this.minutes}m ${this.seconds}s ${this.milliseconds}ms`;
	}

	static fromMillis(ms: number) {
		const milliseconds = ms % 1000;
		const seconds = Math.floor(ms / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const months = Math.floor(days / 30);
		const years = Math.floor(months / 12);

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
			unit === "years"
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
