// https://github.com/Effect-TS/effect/blob/main/src/Function.ts
/* eslint-disable @typescript-eslint/no-unsafe-return */
export const dual: {
	<
		DataLast extends (...args: any[]) => any,
		DataFirst extends (...args: any[]) => any,
	>(
		arity: Parameters<DataFirst>["length"],
		body: DataFirst,
	): DataLast & DataFirst;
	<
		DataLast extends (...args: any[]) => any,
		DataFirst extends (...args: any[]) => any,
	>(
		isDataFirst: (args: IArguments) => boolean,
		body: DataFirst,
	): DataLast & DataFirst;
} = function (arity, body) {
	if (typeof arity === "function") {
		return function () {
			if (arity(arguments)) {
				// @ts-expect-error TS doesn't know that the arity is correct
				return Reflect.apply(body, this, arguments);
			}

			return ((self: any) => body(self, ...arguments)) as any;
		};
	}

	switch (arity) {
		case 0: {
			return body;
		}

		case 1: {
			return function (a) {
				if (arguments.length >= 1) {
					return body(a);
				}

				return function () {
					return body(a);
				};
			};
		}

		case 2: {
			return function (a, b) {
				if (arguments.length >= 2) {
					return body(a, b);
				}

				return function (self: any) {
					return body(self, a);
				};
			};
		}

		case 3: {
			return function (a, b, c) {
				if (arguments.length >= 3) {
					return body(a, b, c);
				}

				return function (self: any) {
					return body(self, a, b);
				};
			};
		}

		case 4: {
			return function (a, b, c, d) {
				if (arguments.length >= 4) {
					return body(a, b, c, d);
				}

				return function (self: any) {
					return body(self, a, b, c);
				};
			};
		}

		case 5: {
			// eslint-disable-next-line max-params
			return function (a, b, c, d, e) {
				if (arguments.length >= 5) {
					return body(a, b, c, d, e);
				}

				return function (self: any) {
					return body(self, a, b, c, d);
				};
			};
		}

		default: {
			return function () {
				if (arguments.length >= arity) {
					// @ts-expect-error TS doesn't know that the arity is correct
					return Reflect.apply(body, this, arguments);
				}

				const args = arguments;
				return function (self: any) {
					return body(self, ...args);
				};
			};
		}
	}
};
