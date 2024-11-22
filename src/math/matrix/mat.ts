import { pipe } from "../../fn";
import { chunk, collect } from "../../iter";
import { repeat } from "../../iter/repeat";
import { random } from "../../random";
import { type uint } from "../../types";
import { closeTo } from "../funcs";

export class Mat extends Float32Array {
  rows: uint;

  constructor(rows: uint, cols: uint);
  constructor(mat: number[][]);
  constructor(rows: uint | number[][], cols = 0) {
    super();
    if (typeof rows === "number") {
      this.set([...repeat([0], rows * cols)]);
      this.rows = rows;
    } else {
      this.set(rows.flat());
      this.rows = rows.length;
    }
  }

  get cols(): number {
    return this.length / this.rows;
  }

  override toString(): string {
    return `mat [
  ${
      pipe(this, chunk(this.cols), collect)
        .map((row) => row.join(" "))
        .join("\n  ")
    }
]`;
  }

  copy(): Mat {
    const m = mat(this.rows, this.cols);
    m.set(this);
    return m;
  }

  static random(rows: uint, cols: uint): Mat {
    const m = mat(rows, cols);
    for (let i = 0, { length } = this; i < length; i++) {
      m[i] = random(-1, 1);
    }

    return m;
  }

  eq(m: Mat, precision?: uint): boolean {
    if (this.rows !== m.rows || this.cols !== m.cols) return false;

    for (let i = 0, { length } = this; i < length; i++) {
      const a = this[i]!;
      const b = m[i]!;
      if (!closeTo(a, b, precision)) return false;
    }

    return true;
  }

  add(m: Mat): this {
    if (this.rows !== m.rows || this.cols !== m.cols) return this;

    for (let i = 0, { length } = this; i < length; i++) {
      this[i] += m[i] || 0;
    }

    return this;
  }

  static add(m1: Mat, m2: Mat): Mat {
    return m1.copy().add(m2);
  }

  sub(m: Mat): this {
    if (this.rows !== m.rows || this.cols !== m.cols) return this;

    for (let i = 0, { length } = this; i < length; i++) {
      this[i] -= m[i] || 0;
    }

    return this;
  }

  static sub(m1: Mat, m2: Mat): Mat {
    return m1.copy().sub(m2);
  }

  mul(m: Mat | number): this {
    this.set(Mat.mul(this, m));
    return this;
  }

  static mul(m1: Mat, m2: Mat | number): Mat {
    if (typeof m2 === "number") {
      const { rows, cols } = m1;
      const ans = mat(rows, cols);
      for (let i = 0, { length } = m1; i < length; i++) {
        ans[i] = (m1[i] ?? 1) * m2;
      }

      return ans;
    }

    const ans = mat(m1.rows, m2.cols);
    const { rows, cols } = ans;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let sum = 0;
        for (let k = 0; k < m1.cols; k++) {
          sum += (m1[i * m1.cols + k] ?? 1) * (m2[k * m2.cols + j] ?? 1);
        }

        ans[i * cols + j] = sum;
      }
    }

    return ans;
  }

  div(m: number): this {
    return this.mul(1 / m);
  }

  static transpose(m: Mat): Mat {
    const { rows, cols } = m;
    const ans = mat(cols, rows);
    for (let i = 0, { length } = this; i < length; i++) {
      for (let j = 0; j < cols; j++) {
        ans[j * cols + i] = m[i * cols + j] || 0;
      }
    }

    return ans;
  }
}

export function mat(rows: uint, cols: uint): Mat;
export function mat(mat: number[][]): Mat;
export function mat(rows: uint | number[][], cols = 1) {
  if (typeof rows === "number") return new Mat(rows, cols);
  return new Mat(rows);
}
