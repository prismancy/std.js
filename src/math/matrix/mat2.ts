import { type int } from "../../types";
import { closeTo } from "../funcs";

export type Mat2Like =
	| [m00: number, m01: number, m10: number, m11: number]
	| Float32Array;
export type ReadonlyMat2Like = Readonly<Mat2Like>;

export class Mat2 extends Float32Array {
	static readonly BYTE_LENGTH = 4 * Float32Array.BYTES_PER_ELEMENT;

	constructor(matrix: ReadonlyMat2Like = [1, 0, 0, 1]) {
		super(matrix);
	}

	override toString() {
		const [a, b, c, d] = this;
		return `mat2 [
  ${a} ${b}
  ${c} ${d}
]`;
	}

	copy() {
		return mat2(this);
	}

	identity() {
		this.set([1, 0, 0, 1]);
		return this;
	}

	eq(m: ReadonlyMat2Like, precision?: int) {
		for (let i = 0; i < 4; i++) {
			const a = this[i]!;
			const b = m[i]!;
			if (!closeTo(a, b, precision)) return false;
		}

		return true;
	}

	add(m: ReadonlyMat2Like) {
		for (let i = 0; i < 4; i++) {
			this[i] += m[i]!;
		}

		return this;
	}

	static add(m1: Mat2, m2: ReadonlyMat2Like) {
		return m1.copy().add(m2);
	}

	sub(m: ReadonlyMat2Like) {
		for (let i = 0; i < 4; i++) {
			this[i] -= m[i]!;
		}

		return this;
	}

	static sub(m1: Mat2, m2: ReadonlyMat2Like) {
		return m1.copy().sub(m2);
	}

	mul(m: number | ReadonlyMat2Like) {
		this.set(Mat2.mul(this, m));
		return this;
	}

	static mul(m1: ReadonlyMat2Like, m2: number | ReadonlyMat2Like) {
		if (typeof m2 === "number") {
			const ans = mat2();
			for (let i = 0; i < 4; i++) {
				ans[i] *= m2;
			}

			return ans;
		}

		const [a0 = 0, a1 = 0, a2 = 0, a3 = 0] = m1;
		const [b0 = 0, b1 = 0, b2 = 0, b3 = 0] = m2;
		return mat2([
			a0 * b0 + a1 * b2,
			a0 * b1 + a1 * b3,

			a2 * b0 + a3 * b2,
			a2 * b1 + a3 * b3,
		]);
	}

	div(m: number) {
		this.mul(1 / m);
		return this;
	}

	transpose() {
		const [, b = 0, c = 0] = this;
		[this[2], this[1]] = [b, c];
		return this;
	}

	det() {
		const [a = 0, b = 0, c = 0, d = 0] = this;
		return a * d - b * c;
	}

	adj() {
		const [a = 0, b = 0, c = 0, d = 0] = this;
		return mat2([d, -b, -c, a]);
	}

	inv() {
		return this.adj().div(this.det());
	}
}

export function mat2(matrix?: ReadonlyMat2Like) {
	return new Mat2(matrix);
}
