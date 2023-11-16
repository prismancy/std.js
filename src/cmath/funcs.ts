import { complex } from "./complex";

export function csqrt(x: number) {
	return x >= 0 ? complex(Math.sqrt(x)) : complex(0, Math.sqrt(-x));
}
