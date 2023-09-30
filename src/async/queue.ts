import { Queue } from "../structs";

export class AsyncQueue<T> extends Queue<() => Promise<T>> {
	async *[Symbol.asyncIterator](): AsyncIterableIterator<T> {
		let item: (() => Promise<T>) | undefined;
		while ((item = this.dequeue())) {
			yield await item();
		}
	}
}
