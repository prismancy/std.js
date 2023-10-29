import { random } from "../../random";
import { closeTo } from "../funcs";

type Mat = number[][];

export class Matrix {
	[i: number]: Float64Array;

	rows: number;
	cols: number;

	constructor(rows: number, cols: number);
	constructor(mat: Mat);
	constructor(rowsOrMat: number | Mat, cols?: number) {
		if (typeof rowsOrMat === "number") {
			cols = cols || 0;
			for (let i = 0; i < rowsOrMat; i++) {
				this[i] = new Float64Array(cols).fill(0);
			}

			this.rows = rowsOrMat;
			this.cols = cols;
		} else {
			for (const [i, element] of rowsOrMat.entries()) {
				const row = element;
				this[i] = new Float64Array(row);
			}

			this.rows = rowsOrMat.length;
			this.cols = rowsOrMat[0]!.length;
		}
	}

	toString() {
		const [...rows] = this;
		return `mat [
  ${rows.map(row => row.join(" ")).join("\n  ")}
]`;
	}

	*[Symbol.iterator]() {
		const { rows } = this;
		for (let i = 0; i < rows; i++) {
			yield this[i]!;
		}
	}

	copy() {
		return mat(this.rows, this.cols).set(this);
	}

	static fromArray(array: number[]) {
		const { length } = array;
		const m = mat(length, 1);
		for (let i = 0; i < length; i++) {
			m[i]![0] = array[i]!;
		}

		return m;
	}

	toArray() {
		return [...this].flatMap(row => [...row]);
	}

	static random(rows: number, cols: number) {
		const m = mat(rows, cols);
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				m[i]![j] = random(-1, 1);
			}
		}

		return m;
	}

	set(m: Matrix | Mat) {
		const { rows, cols } = this;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				this[i]![j] = m[i]![j]!;
			}
		}

		return this;
	}

	eq(m: Matrix | Mat, precision?: number) {
		const { rows, cols } = this;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const a = this[i]![j]!;
				const b = m[i]![j]!;
				if (!closeTo(a, b, precision)) return false;
			}
		}

		return true;
	}

	add(m: Matrix | Mat) {
		const { rows, cols } = this;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				this[i]![j] += m[i]![j]!;
			}
		}

		return this;
	}

	static add(m1: Matrix, m2: Matrix | Mat) {
		return m1.copy().add(m2);
	}

	sub(m: Matrix | Mat) {
		const { rows, cols } = this;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				this[i]![j] -= m[i]![j]!;
			}
		}

		return this;
	}

	static sub(m1: Matrix, m2: Matrix | Mat) {
		return m1.copy().sub(m2);
	}

	mul(m: Matrix | number) {
		return this.set(Matrix.mul(this, m));
	}

	static mul(m1: Matrix, m2: Matrix | number) {
		if (typeof m2 === "number") {
			const { rows, cols } = m1;
			const ans = mat(rows, cols);
			for (let i = 0; i < rows; i++) {
				for (let j = 0; j < cols; j++) {
					ans[i]![j] = m1[i]![j]! * m2;
				}
			}

			return ans;
		}

		const ans = mat(m1.rows, m2.cols);
		const { rows, cols } = ans;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				let sum = 0;
				for (let k = 0; k < m1.cols; k++) {
					sum += m1[i]![k]! * m2[k]![j]!;
				}

				ans[i]![j] = sum;
			}
		}

		return ans;
	}

	div(m: number) {
		return this.mul(1 / m);
	}

	static transpose(m: Matrix) {
		const { rows, cols } = m;
		const ans = mat(cols, rows);
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				ans[j]![i] = m[i]![j]!;
			}
		}

		return ans;
	}

	map(func: (value: number, i: number, j: number) => number) {
		const { rows, cols } = this;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				this[i]![j] = func(this[i]![j]!, i, j);
			}
		}

		return this;
	}

	static map(m: Matrix, func: (value: number, i: number, j: number) => number) {
		return m.copy().map(func);
	}
}

export function mat(rows: number, cols: number): Matrix;
export function mat(mat: Mat): Matrix;
export function mat(rowsOrMat: number | Mat, cols?: number) {
	if (typeof rowsOrMat === "number") return new Matrix(rowsOrMat, cols || 0);
	return new Matrix(rowsOrMat);
}
