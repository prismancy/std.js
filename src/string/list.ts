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
