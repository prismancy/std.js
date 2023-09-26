export const sleep = async (ms = 0) =>
	new Promise<void>(resolve => setTimeout(resolve, ms));

type Func = (...args: any[]) => any;

export function throttle<T extends Func>(
	func: T,
	ms: number,
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | undefined;
	let lastCalled = 0;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(
			() => {
				func(...args);
				timeout = undefined;
				lastCalled = Date.now();
			},
			ms - (Date.now() - lastCalled),
		);
	};
}

export function debounce<T extends Func>(
	func: T,
	ms: number,
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | undefined;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(...args);
			timeout = undefined;
		}, ms);
	};
}
