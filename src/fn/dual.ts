/* eslint-disable @typescript-eslint/no-unsafe-return */
/**
 * Allows a function to be used in a data-first or data-last manner in a pipe
 * @param arity the number of arguments the function takes
 * @param fn
 * @returns
 */
export const dual: {
	<
		DataLast extends (...args: any[]) => any,
		DataFirst extends (...args: any[]) => any,
	>(
		arity: Parameters<DataFirst>["length"],
		fn: DataFirst,
	): DataLast & DataFirst;
	<
		DataLast extends (...args: any[]) => any,
		DataFirst extends (...args: any[]) => any,
	>(
		isDataFirst: (args: IArguments) => boolean,
		fn: DataFirst,
	): DataLast & DataFirst;
} = function (arity, fn) {
	if (typeof arity === "function") {
		return () => {
			if (arity(arguments))
				// @ts-expect-error TS doesn't know that the arity is correct
				return Reflect.apply(fn, this, arguments);
			return ((self: any) => fn(self, ...arguments)) as any;
		};
	}

	switch (arity) {
		case 0: {
			return fn;
		}

		case 1: {
			return a => {
				if (arguments.length >= 1) return fn(a);
				return () => fn(a);
			};
		}

		case 2: {
			return (a, b) => {
				if (arguments.length >= 2) return fn(a, b);
				return (self: any) => fn(self, a);
			};
		}

		case 3: {
			return (a, b, c) => {
				if (arguments.length >= 3) return fn(a, b, c);
				return (self: any) => fn(self, a, b);
			};
		}

		case 4: {
			return (a, b, c, d) => {
				if (arguments.length >= 4) return fn(a, b, c, d);
				return (self: any) => fn(self, a, b, c);
			};
		}

		default: {
			return () => {
				if (arguments.length >= arity)
					// @ts-expect-error TS doesn't know that the arity is correct
					return Reflect.apply(fn, this, arguments);
				const args = arguments;
				return (self: any) => fn(self, ...args);
			};
		}
	}
};
