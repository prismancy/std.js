import { type int } from "../../types";
import { closeTo } from "../funcs";

export type Mat3Like =
  | [
    m00: number,
    m01: number,
    m02: number,
    m10: number,
    m11: number,
    m12: number,
    m20: number,
    m21: number,
    m22: number,
  ]
  | Float32Array;
export type ReadonlyMat3Like = Readonly<Mat3Like>;

export class Mat3 extends Float32Array {
  static readonly BYTE_LENGTH = 9 * Float32Array.BYTES_PER_ELEMENT;

  constructor(matrix: ReadonlyMat3Like = [1, 0, 0, 0, 1, 0, 0, 0, 1]) {
    super(matrix);
  }

  override toString(): string {
    const [a, b, c, d, e, f, g, h, i] = this;
    return `mat3 [
  ${a} ${b} ${c}
  ${d} ${e} ${f}
  ${g} ${h} ${i}
]`;
  }

  copy(): Mat3 {
    return mat3(this);
  }

  identity(): this {
    this.set([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    return this;
  }

  eq(m: ReadonlyMat3Like, precision?: int): boolean {
    for (let i = 0; i < 9; i++) {
      const a = this[i]!;
      const b = m[i]!;
      if (!closeTo(a, b, precision)) return false;
    }

    return true;
  }

  add(m: ReadonlyMat3Like): this {
    for (let i = 0; i < 9; i++) {
      this[i] += m[i]!;
    }

    return this;
  }

  static add(m1: Mat3, m2: ReadonlyMat3Like): Mat3 {
    return m1.copy().add(m2);
  }

  sub(m: ReadonlyMat3Like): this {
    for (let i = 0; i < 9; i++) {
      this[i] -= m[i]!;
    }

    return this;
  }

  static sub(m1: Mat3, m2: ReadonlyMat3Like): Mat3 {
    return m1.copy().sub(m2);
  }

  mul(m: number | ReadonlyMat3Like): this {
    this.set(Mat3.mul(this, m));
    return this;
  }

  static mul(m1: ReadonlyMat3Like, m2: number | ReadonlyMat3Like): Mat3 {
    if (typeof m2 === "number") {
      const ans = mat3(m1);
      for (let i = 0; i < 9; i++) {
        ans[i] *= m2;
      }

      return ans;
    }

    const [
      a0 = 0,
      a1 = 0,
      a2 = 0,
      a3 = 0,
      a4 = 0,
      a5 = 0,
      a6 = 0,
      a7 = 0,
      a8 = 0,
    ] = m1;
    const [
      b0 = 0,
      b1 = 0,
      b2 = 0,
      b3 = 0,
      b4 = 0,
      b5 = 0,
      b6 = 0,
      b7 = 0,
      b8 = 0,
    ] = m2;
    return mat3([
      a0 * b0 + a1 * b3 + a2 * b6,
      a0 * b1 + a1 * b4 + a2 * b7,
      a0 * b2 + a1 * b5 + a2 * b8,

      a3 * b0 + a4 * b3 + a5 * b6,
      a3 * b1 + a4 * b4 + a5 * b7,
      a3 * b2 + a4 * b5 + a5 * b8,

      a6 * b0 + a7 * b3 + a8 * b6,
      a6 * b1 + a7 * b4 + a8 * b7,
      a6 * b2 + a7 * b5 + a8 * b8,
    ]);
  }

  div(m: number): this {
    return this.mul(1 / m);
  }

  transpose(): this {
    const [, b = 0, c = 0, d = 0, , f = 0, g = 0, h = 0] = this;
    [this[3], this[1]] = [b, d];
    [this[6], this[2]] = [c, g];
    [this[7], this[5]] = [f, h];
    return this;
  }

  det(): number {
    const [a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0] =
      this;
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  }

  adj(): Mat3 {
    const [a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0] =
      this;
    return mat3([
      e * i - f * h,
      -(d * i - f * g),
      d * h - e * g,

      -(b * i - c * h),
      a * i - c * g,
      -(a * h - b * g),

      b * f - c * e,
      -(a * f - c * d),
      a * e - b * d,
    ]).transpose();
  }

  inv(): Mat3 {
    return this.adj().div(this.det());
  }
}

export function mat3(matrix?: ReadonlyMat3Like): Mat3 {
  return new Mat3(matrix);
}
