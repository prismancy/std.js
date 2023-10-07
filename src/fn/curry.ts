// eslint-disable-next-line @typescript-eslint/ban-types
type Curried<Args extends any[], R> = Args extends []
	? R
	: <T extends any[]>(
			...args: T
	  ) => Args extends [...T, ...infer Rest] ? Curried<Rest, R> : never;

export const curry = <Args extends any[], R>(fn: (...args: Args) => R) => {
	const curried = ((...args: any[]) =>
		args.length >= fn.length
			? // @ts-expect-error TS doesn't know that the length check above guarantees that the args are of type Args
			  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			  fn(...args)
			: // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			  (...more: any[]) => curried(...args, ...more)) as Curried<Args, R>;
	return curried;
};
