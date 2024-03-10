import { descend } from "../../cmp.ts";
import { Heap } from "./heap.ts";

export class MaxHeap<T> extends Heap<T> {
	constructor(data?: T[], heapify?: boolean) {
		super(descend, data, heapify);
	}

	override copy(): MaxHeap<T> {
		return new MaxHeap([...this.data], false);
	}
}
