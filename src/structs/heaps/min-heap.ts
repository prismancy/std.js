import { ascend } from "../../cmp";
import { Heap } from "./heap";

export class MinHeap<T> extends Heap<T> {
  constructor(data?: T[], heapify?: boolean) {
    super(ascend, data, heapify);
  }

  override copy(): MinHeap<T> {
    return new MinHeap([...this.data], false);
  }
}
