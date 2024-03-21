import { Queue } from "../structs/mod.ts";

export class AsyncQueue<T> extends Queue<() => Promise<T>>
  implements AsyncIterable<T> {
  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    let item: (() => Promise<T>) | undefined;
    while ((item = this.dequeue())) {
      yield await item();
    }
  }
}
