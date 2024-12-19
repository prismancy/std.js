import type { Awaitable, uint } from "../types";

type Task<T> = () => Awaitable<T>;
interface TaskQueueItem<T> {
  task: () => Awaitable<T>;
  resolve: (result: T) => void;
  reject: (reason?: any) => void;
}

export class TaskQueue<T> {
  private stopped = false;
  private paused = false;
  private pendingTask = false;

  constructor(protected tasks: Array<TaskQueueItem<T>> = []) {}

  get size(): uint {
    return this.tasks.length;
  }

  async enqueue(task: Task<T>, autoDequeue = true) {
    return new Promise<T>((resolve, reject) => {
      this.tasks.push({ task, resolve, reject });
      if (autoDequeue) {
        void this.dequeue();
      }
    });
  }

  async dequeue() {
    if (this.pendingTask || this.paused) {
      return false;
    }
    if (this.stopped) {
      this.tasks.length = 0;
      this.stopped = false;
      return false;
    }

    const item = this.tasks.pop();
    if (!item) {
      return false;
    }

    try {
      this.pendingTask = true;

      const result = await item.task();

      this.pendingTask = false;
      item.resolve(result);
    } catch (error) {
      item.reject(error);
      this.pendingTask = false;
    }

    void this.dequeue();
    return true;
  }

  stop() {
    this.stopped = true;
  }

  pause() {
    this.paused = true;
  }

  async start() {
    this.stopped = false;
    this.paused = false;
    return this.dequeue();
  }
}
