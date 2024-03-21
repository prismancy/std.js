import { bench, describe } from "vitest";
import { shuffle, unorderedRemove } from "../../array";
import { max } from "../../math";
import { MaxHeap } from "./max-heap";

describe("find max", () => {
  const array = shuffle(Array.from({ length: 1_000_000 }, (_, i) => i));
  const heap = new MaxHeap(array);

  bench("linear", () => {
    max(array);
  });

  bench("heap", () => {
    heap.peek();
  });
});

describe("remove max until empty", () => {
  const originalArray = Array.from({ length: 10_000 }, (_, i) => i);
  let array: number[];
  bench(
    "linear",
    () => {
      while (array.length) {
        let max = Number.NEGATIVE_INFINITY;
        let maxIndex = -1;
        for (const [i, element] of array.entries()) {
          const value = element;
          if (value > max) {
            max = value;
            maxIndex = i;
          }
        }

        unorderedRemove(array, maxIndex);
      }
    },
    {
      iterations: 10,
      time: 0,
      setup() {
        array = shuffle([...originalArray]);
      },
    },
  );

  let heap: MaxHeap<number>;
  bench(
    "heap",
    () => {
      for (const _ of heap) {
      }
    },
    {
      iterations: 10,
      time: 0,
      setup() {
        heap = new MaxHeap(shuffle(array));
      },
    },
  );
});
