/* eslint-disable @typescript-eslint/no-floating-promises */
import { Queue } from "../structs";
import { type AnyFunction, type Result, type uint } from "../types";

export * from "./queue";

export const sleep = async (ms = 0) =>
	new Promise<void>(resolve => setTimeout(resolve, ms));

export function throttle<T extends AnyFunction>(
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

export function debounce<T extends AnyFunction>(
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

/**
 * Runs promises concurrently with a limit to the number of promises running at once
 * @param funcs an iterable of functions that return promises
 * @param max the most promises that can run at once
 * @returns an array of results of all the promises in the order they were passed in
 */
export async function concurrently<T>(
	funcs: Iterable<() => Promise<T>>,
	max: number,
) {
	const tasks = [...funcs];
	const results = Array.from<T>({ length: tasks.length });
	const queue = new Queue(tasks);
	const length = queue.size;
	let i = 0;
	return new Promise<T[]>(resolve => {
		const next = async () => {
			const func = queue.dequeue();
			if (func) {
				results[i++] = await func();
				next();
			} else if (results.length === length) {
				resolve(results);
			}
		};

		for (let i = 0; i < max; i++) {
			next();
		}
	});
}

export async function retry<T>(
	fn: () => Promise<T>,
	{ maxAttempts = 5, delay = 0 }: { maxAttempts?: uint; delay?: number } = {},
): Promise<Result<T, unknown>> {
	let attempts = 0;
	// eslint-disable-next-line no-constant-condition
	while (true) {
		try {
			return [await fn(), undefined];
		} catch (error) {
			if (++attempts >= maxAttempts) return [undefined, error];
			await sleep(delay);
		}
	}
}

export async function retryWithExponentialBackoff<T>(
	fn: () => Promise<T>,
	{
		maxAttempts = 5,
		startDelay = 1000,
		multiplier = 2,
	}: {
		maxAttempts?: uint;
		startDelay?: number;
		multiplier?: number;
	} = {},
): Promise<Result<T, unknown>> {
	let attempts = 0;
	// eslint-disable-next-line no-constant-condition
	while (true) {
		try {
			return [await fn(), undefined];
		} catch (error) {
			const delay = startDelay * multiplier ** attempts;
			if (++attempts >= maxAttempts) return [undefined, error];
			await sleep(delay);
		}
	}
}
