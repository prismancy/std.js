import { Duration, type DurationLike } from "./duration";

export function durationFromMillis(ms: number) {
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

interface DurationLikeWithMonths extends DurationLike {
	months?: number;
}
export function addDuration(
	date: Date,
	{
		years,
		days,
		months,
		hours,
		minutes,
		seconds,
		milliseconds,
	}: DurationLikeWithMonths,
): Date {
	const newDate = new Date(date);
	if (years) newDate.setFullYear(newDate.getFullYear() + years);
	if (months) newDate.setMonth(newDate.getMonth() + months);
	if (days) newDate.setDate(newDate.getDate() + days);
	if (hours) newDate.setHours(newDate.getHours() + hours);
	if (minutes) newDate.setMinutes(newDate.getMinutes() + minutes);
	if (seconds) newDate.setSeconds(newDate.getSeconds() + seconds);
	if (milliseconds)
		newDate.setMilliseconds(newDate.getMilliseconds() + milliseconds);
	return newDate;
}

export function subtractDuration(
	date: Date,
	{
		years,
		days,
		months,
		hours,
		minutes,
		seconds,
		milliseconds,
	}: DurationLikeWithMonths,
): Date {
	const newDate = new Date(date);
	if (years) newDate.setFullYear(newDate.getFullYear() - years);
	if (days) newDate.setDate(newDate.getDate() - days);
	if (months) newDate.setMonth(newDate.getMonth() - months);
	if (hours) newDate.setHours(newDate.getHours() - hours);
	if (minutes) newDate.setMinutes(newDate.getMinutes() - minutes);
	if (seconds) newDate.setSeconds(newDate.getSeconds() - seconds);
	if (milliseconds)
		newDate.setMilliseconds(newDate.getMilliseconds() - milliseconds);
	return newDate;
}

/**
 * Calculates the duration from `a` since `b`
 * The duration will be positive if `a` is after `b`
 * @param a
 * @param b
 */
export function since(a: Date, b: Date) {
	const millis = a.getTime() - b.getTime();
	return durationFromMillis(millis);
}

/**
 * Calculates the duration from `a` until `b`
 * The duration will be negative if `b` is after `a`
 * @param a
 * @param b
 */
export function until(a: Date, b: Date) {
	const millis = b.getTime() - a.getTime();
	return durationFromMillis(millis);
}

export const stripTime = (date: Date) =>
	new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const getToday = () => stripTime(new Date());
export const getTomorrow = () => addDuration(getToday(), { days: 1 });
export const getYesterday = () => subtractDuration(getToday(), { days: 1 });

/**
 * Determines if two dates are the same day, ignoring time
 * @param a
 * @param b
 */
export function sameDay(a: Date, b: Date) {
	return (
		a.getDate() === b.getDate() &&
		a.getMonth() === b.getMonth() &&
		a.getFullYear() === b.getFullYear()
	);
}

/**
 * Checks if a date is valid
 * @param date
 */
export function validDate(date: Date) {
	const millis = date.getTime();
	return !Number.isNaN(millis);
}
