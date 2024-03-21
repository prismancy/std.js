/**
 * Joins a list of strings into a single string, using a conjunction before the last item.
 * @param items an array of strings
 * @param conjunction the word to use before the last item
 * @example
 * ```ts
 * listItems(["apples", "oranges", "bananas"]); // "apples, oranges, and bananas"
 * listItems(["apples", "oranges", "bananas"], "or"); // "apples, oranges, or bananas"
 * ```
 */
export function listItems(items: string[], conjunction = "and"): string {
  switch (items.length) {
    case 0: {
      return "";
    }

    case 1: {
      return items[0] || "";
    }

    case 2: {
      return items.join(` ${conjunction} `);
    }

    default: {
      return `${items.slice(0, -1).join(", ")}, ${conjunction} ${items.at(-1)}`;
    }
  }
}
