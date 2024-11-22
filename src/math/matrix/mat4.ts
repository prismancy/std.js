import { type int } from "../../types";
import { closeTo } from "../funcs";
import { mat3 } from "./mat3";

export type Mat4Like =
  | [
    m00: number,
    m01: number,
    m02: number,
    m03: number,
    m10: number,
    m11: number,
    m12: number,
    m13: number,
    m20: number,
    m21: number,
    m22: number,
    m23: number,
    m30: number,
    m31: number,
    m32: number,
    m33: number,
  ]
  | Float32Array;
export type ReadonlyMat4Like = Readonly<Mat4Like>;

export class Mat4 extends Float32Array {
  constructor(
    matrix: ReadonlyMat4Like = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  ) {
    super(matrix);
  }

  override toString(): string {
    const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = this;
    return `mat4 [
  ${a} ${b} ${c} ${d}
  ${e} ${f} ${g} ${h}
  ${i} ${j} ${k} ${l}
  ${m} ${n} ${o} ${p}
]`;
  }

  copy(): Mat4 {
    return mat4(this);
  }

  eq(m: ReadonlyMat4Like, precision?: int): boolean {
    for (let i = 0; i < 16; i++) {
      const a = this[i]!;
      const b = m[i]!;
      if (!closeTo(a, b, precision)) return false;
    }

    return true;
  }

  add(m: ReadonlyMat4Like): this {
    for (let i = 0; i < 16; i++) {
      this[i] += m[i]!;
    }

    return this;
  }

  static add(m1: Mat4, m2: ReadonlyMat4Like): Mat4 {
    return m1.copy().add(m2);
  }

  sub(m: ReadonlyMat4Like): this {
    for (let i = 0; i < 16; i++) {
      this[i] -= m[i]!;
    }

    return this;
  }

  static sub(m1: Mat4, m2: ReadonlyMat4Like): Mat4 {
    return m1.copy().sub(m2);
  }

  mul(m: number | ReadonlyMat4Like): this {
    this.set(Mat4.mul(this, m));
    return this;
  }

  static mul(m1: ReadonlyMat4Like, m2: number | ReadonlyMat4Like): Mat4 {
    if (typeof m2 === "number") {
      const ans = mat4();
      for (let i = 0; i < 16; i++) {
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
      a9 = 0,
      a10 = 0,
      a11 = 0,
      a12 = 0,
      a13 = 0,
      a14 = 0,
      a15 = 0,
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
      b9 = 0,
      b10 = 0,
      b11 = 0,
      b12 = 0,
      b13 = 0,
      b14 = 0,
      b15 = 0,
    ] = m2;
    return mat4([
      a0 * b0 + a1 * b4 + a2 * b8 + a3 * b12,
      a0 * b1 + a1 * b5 + a2 * b9 + a3 * b13,
      a0 * b2 + a1 * b6 + a2 * b10 + a3 * b14,
      a0 * b3 + a1 * b7 + a2 * b11 + a3 * b15,

      a4 * b0 + a5 * b4 + a6 * b8 + a7 * b12,
      a4 * b1 + a5 * b5 + a6 * b9 + a7 * b13,
      a4 * b2 + a5 * b6 + a6 * b10 + a7 * b14,
      a4 * b3 + a5 * b7 + a6 * b11 + a7 * b15,

      a8 * b0 + a9 * b4 + a10 * b8 + a11 * b12,
      a8 * b1 + a9 * b5 + a10 * b9 + a11 * b13,
      a8 * b2 + a9 * b6 + a10 * b10 + a11 * b14,
      a8 * b3 + a9 * b7 + a10 * b11 + a11 * b15,

      a12 * b0 + a13 * b4 + a14 * b8 + a15 * b12,
      a12 * b1 + a13 * b5 + a14 * b9 + a15 * b13,
      a12 * b2 + a13 * b6 + a14 * b10 + a15 * b14,
      a12 * b3 + a13 * b7 + a14 * b11 + a15 * b15,
    ]);
  }

  div(m: number): this {
    return this.mul(1 / m);
  }

  transpose(): this {
    const [
      ,
      b = 0,
      c = 0,
      d = 0,
      e = 0,
      ,
      g = 0,
      h = 0,
      i = 0,
      j = 0,
      ,
      l = 0,
      m = 0,
      n = 0,
      o = 0,
    ] = this;
    [this[4], this[1]] = [b, e];
    [this[8], this[2]] = [c, i];
    [this[12], this[3]] = [d, m];
    [this[9], this[6]] = [g, j];
    [this[13], this[7]] = [h, n];
    [this[14], this[11]] = [l, o];
    return this;
  }

  det(): number {
    const [
      a = 0,
      b = 0,
      c = 0,
      d = 0,
      e = 0,
      f = 0,
      g = 0,
      h = 0,
      i = 0,
      j = 0,
      k = 0,
      l = 0,
      m = 0,
      n = 0,
      o = 0,
      p = 0,
    ] = this;
    return (
      a * mat3([f, g, h, j, k, l, n, o, p]).det() -
      b * mat3([e, g, h, i, k, l, m, o, p]).det() +
      c * mat3([e, f, h, i, j, l, m, n, p]).det() -
      d * mat3([e, f, g, i, j, k, m, n, o]).det()
    );
  }

  adj(): Mat4 {
    const [
      a = 0,
      b = 0,
      c = 0,
      d = 0,
      e = 0,
      f = 0,
      g = 0,
      h = 0,
      i = 0,
      j = 0,
      k = 0,
      l = 0,
      m = 0,
      n = 0,
      o = 0,
      p = 0,
    ] = this;
    return mat4([
      mat3([f, g, h, j, k, l, n, o, p]).det(),
      -mat3([e, g, h, i, k, l, m, o, p]).det(),
      mat3([e, f, h, i, j, l, m, n, p]).det(),
      -mat3([e, f, g, i, j, k, m, n, o]).det(),
      -mat3([b, c, d, j, k, l, n, o, p]).det(),
      mat3([a, c, d, i, k, l, m, o, p]).det(),
      -mat3([a, b, d, i, j, l, m, n, p]).det(),
      mat3([a, b, c, i, j, k, m, n, o]).det(),
      mat3([b, c, d, f, g, h, n, o, p]).det(),
      -mat3([a, c, d, e, g, h, m, o, p]).det(),
      mat3([a, b, d, e, f, h, m, n, p]).det(),
      -mat3([a, b, c, e, f, g, m, n, o]).det(),
      -mat3([b, c, d, f, g, h, j, k, l]).det(),
      mat3([a, c, d, e, g, h, i, k, l]).det(),
      -mat3([a, b, d, e, f, h, i, j, l]).det(),
      mat3([a, b, c, e, f, g, i, j, k]).det(),
    ]).transpose();
  }

  inv(): Mat4 {
    return this.adj().div(this.det());
  }
}

export function mat4(matrix?: ReadonlyMat4Like): Mat4 {
  return new Mat4(matrix);
}
