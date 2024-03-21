/**
 * @module
 * EventEmitter implementation
 */

import { pipe } from "./fn/mod.ts";
import { pick } from "./iter/mod.ts";
import { sum } from "./stats.ts";
import { type AnyRecord, uint } from "./types.ts";

type Unsubscribe = () => void;

export class EventEmitter<Events extends AnyRecord = AnyRecord> {
  private readonly events = new Map<
    keyof Events,
    Set<(data: Events[keyof Events]) => any>
  >();

  listenersCount(event?: keyof Events): uint {
    if (event) return this.events.get(event)?.size || 0;
    return pipe(this.events.values(), pick("size"), sum);
  }

  listeners(event: keyof Events): Array<(data: Events[keyof Events]) => any> {
    return [...(this.events.get(event) || [])];
  }

  on<EventName extends keyof Events>(
    event: EventName,
    listener: (data: Events[EventName]) => any,
  ): Unsubscribe {
    const listeners = this.events.get(event) || new Set<Events[EventName]>();
    // @ts-expect-error-error TypeScript isn't smart enough here
    listeners.add(listener);
    this.events.set(event, listeners);
    return () => {
      // @ts-expect-error-error TypeScript isn't smart enough here
      listeners.delete(listener);
    };
  }

  once<EventName extends keyof Events>(
    event: EventName,
    listener: (data: Events[EventName]) => any,
  ): Unsubscribe {
    const unsubscribe = this.on(event, (data) => {
      unsubscribe();
      listener(data);
    });
    return unsubscribe;
  }

  emit<EventName extends keyof Events>(
    event: EventName,
    data: Events[EventName],
  ): this {
    const listeners = this.events.get(event);
    if (listeners) {
      for (const listener of listeners) {
        listener(data);
      }
    }

    return this;
  }

  off<EventName extends keyof Events>(
    event: EventName,
    listener: (data: Events[EventName]) => any,
  ): boolean {
    const listeners = this.events.get(event);
    // @ts-expect-error TypeScript isn't smart enough here
    return listeners?.delete(listener) || false;
  }

  removeAllListeners(event?: keyof Events): this {
    if (event) this.events.delete(event);
    else this.events.clear();
    return this;
  }
}
