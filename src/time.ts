export function validDate(date: Date): boolean {
	const millis = date.getTime();
	// eslint-disable-next-line no-self-compare
	return millis === millis;
}

export const stripTime = (date: Date) =>
	new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const getToday = () => stripTime(new Date());

export function getTomorrow(): Date {
	const now = new Date();
	return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
}

export function sameDay(date1: Date, date2: Date): boolean {
	return (
		date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()
	);
}
