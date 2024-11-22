import { random } from "../../random";
import { clamp, lerp } from "../funcs";
import { type Vec } from "./vec";

export type Vec3Like = [x: number, y: number, z: number] | Float32Array;
export type ReadonlyVec3Like = Readonly<Vec3Like>;
type First = ReadonlyVec3Like | number;

export class Vec3 extends Float32Array implements Vec {
  static readonly BYTE_LENGTH = 3 * Float32Array.BYTES_PER_ELEMENT;

  constructor(x: First = 0, y?: number, z?: number) {
    super([0, 0, 0]);
    if (typeof x === "number") {
      this.x = x;
      this.y = y ?? x;
      this.z = z ?? (y === undefined ? x : 0);
    } else {
      [this[0] = 0, this[1] = 0, this[2] = 0] = x;
    }
  }

  /* prettier-ignore */ get x(): number {
    return this[0] || 0;
  }
  /* prettier-ignore */ set x(value: number) {
    this[0] = value;
  }
  /* prettier-ignore */ get y(): number {
    return this[1] || 0;
  }
  /* prettier-ignore */ set y(value: number) {
    this[1] = value;
  }
  /* prettier-ignore */ get z(): number {
    return this[2] || 0;
  }
  /* prettier-ignore */ set z(value: number) {
    this[2] = value;
  }

  /* prettier-ignore */ get r(): number {
    return this[0] || 0;
  }
  /* prettier-ignore */ set r(value: number) {
    this[0] = value;
  }
  /* prettier-ignore */ get g(): number {
    return this[1] || 0;
  }
  /* prettier-ignore */ set g(value: number) {
    this[1] = value;
  }
  /* prettier-ignore */ get b(): number {
    return this[2] || 0;
  }
  /* prettier-ignore */ set b(value: number) {
    this[2] = value;
  }

  override toString(): string {
    const [x, y, z] = this;
    return `vec3 <${x}, ${y}, ${z}>`;
  }

  copy(): Vec3 {
    return vec3(...this);
  }

  static random(mag = 1): Vec3 {
    return vec3(0, 0, 1)
      .rotateX(random(Math.PI * 2))
      .rotateY(random(Math.PI * 2))
      .setMag(mag);
  }

  eq(x: First, y?: number, z?: number): boolean {
    if (typeof x === "number") {
      return (
        this.x === x &&
        this.y === (y ?? x) &&
        this.z === (z ?? (y === undefined ? x : 0))
      );
    }
    return this.x === x[0] && this.y === x[1] && this.z === x[2];
  }

  neg(): Vec3 {
    return vec3(-this.x, -this.y, -this.z);
  }

  add(x: First, y?: number, z?: number): this {
    if (typeof x === "number") {
      this.x += x;
      this.y += y ?? x;
      this.z += z ?? (y === undefined ? x : 0);
    } else {
      this.x += x[0];
      this.y += x[1];
      this.z += x[2];
    }

    return this;
  }

  static add(v1: Vec3, x: First, y?: number, z?: number): Vec3 {
    return v1.copy().add(x, y, z);
  }

  sub(x: First, y?: number, z?: number): this {
    if (typeof x === "number") {
      this.x -= x;
      this.y -= y ?? x;
      this.z -= z ?? (y === undefined ? x : 0);
    } else {
      this.x -= x[0];
      this.y -= x[1];
      this.z -= x[2];
    }

    return this;
  }

  static sub(v1: Vec3, x: First, y?: number, z?: number): Vec3 {
    return v1.copy().sub(x, y, z);
  }

  mul(x: First, y?: number, z?: number): this {
    if (typeof x === "number") {
      this.x *= x;
      this.y *= y ?? x;
      this.z *= z ?? (y === undefined ? x : 1);
    } else {
      this.x *= x[0];
      this.y *= x[1];
      this.z *= x[2];
    }

    return this;
  }

  static mul(v1: Vec3, x: First, y?: number, z?: number): Vec3 {
    return v1.copy().mul(x, y, z);
  }

  div(x: First, y?: number, z?: number): this {
    if (typeof x === "number") {
      this.x /= x;
      this.y /= y ?? x;
      this.z /= z ?? (y === undefined ? x : 1);
    } else {
      this.x /= x[0];
      this.y /= x[1];
      this.z /= x[2];
    }

    return this;
  }

  static div(v1: Vec3, x: First, y?: number, z?: number): Vec3 {
    return v1.copy().div(x, y, z);
  }

  static fma(
    a: ReadonlyVec3Like,
    b: ReadonlyVec3Like,
    c: ReadonlyVec3Like,
  ): Vec3 {
    return vec3(a[0] * b[0] + c[0], a[1] * b[1] + c[1], a[2] * b[2] + c[2]);
  }

  lt(x: ReadonlyVec3Like): Vec3 {
    return vec3(
      this.x < x[0] ? 1 : 0,
      this.y < x[1] ? 1 : 0,
      this.z < x[2] ? 1 : 0,
    );
  }

  lte(x: ReadonlyVec3Like): Vec3 {
    return vec3(
      this.x <= x[0] ? 1 : 0,
      this.y <= x[1] ? 1 : 0,
      this.z <= x[2] ? 1 : 0,
    );
  }

  gt(x: ReadonlyVec3Like): Vec3 {
    return vec3(
      this.x > x[0] ? 1 : 0,
      this.y > x[1] ? 1 : 0,
      this.z > x[2] ? 1 : 0,
    );
  }

  gte(x: ReadonlyVec3Like): Vec3 {
    return vec3(
      this.x >= x[0] ? 1 : 0,
      this.y >= x[1] ? 1 : 0,
      this.z >= x[2] ? 1 : 0,
    );
  }

  limit(max: number): this {
    const maxSq = max * max;
    const magSq = this.magSq();
    if (magSq > maxSq) this.setMag(max);
    return this;
  }

  normalize(): this {
    const mag = this.mag();
    if (mag !== 0) this.div(mag);
    return this;
  }

  static normalize(v: Vec3): Vec3 {
    return v.copy().normalize();
  }

  mag(): number {
    return Math.sqrt(this.magSq());
  }

  setMag(n: number): this {
    return this.normalize().mul(n);
  }

  magSq(): number {
    const { x, y, z } = this;
    return x * x + y * y + z * z;
  }

  dist(v: Vec3): number {
    return Math.sqrt(this.distSq(v));
  }

  distSq(v: Vec3): number {
    return Vec3.sub(v, this).magSq();
  }

  dot(v: ReadonlyVec3Like): number {
    const { x, y, z } = this;
    return x * v[0] + y * v[1] + z * v[2];
  }

  cross(v: ReadonlyVec3Like): Vec3 {
    const { x, y, z } = this;
    return vec3(y * v[2] - z * v[1], z * v[0] - x * v[2], x * v[1] - y * v[0]);
  }

  lerp(v: ReadonlyVec3Like, norm: number): this {
    const { x, y, z } = this;
    this.x = lerp(x, v[0], norm);
    this.y = lerp(y, v[1], norm);
    this.z = lerp(z, v[2], norm);
    return this;
  }

  static lerp(v1: Vec3, v2: ReadonlyVec3Like, norm: number): Vec3 {
    return v1.copy().lerp(v2, norm);
  }

  clamp(min: ReadonlyVec3Like, max: ReadonlyVec3Like): this {
    const { x, y, z } = this;
    this.x = clamp(x, min[0], max[0]);
    this.y = clamp(y, min[1], max[1]);
    this.z = clamp(z, min[2], max[2]);
    return this;
  }

  static clamp(v: Vec3, min: ReadonlyVec3Like, max: ReadonlyVec3Like): Vec3 {
    return v.copy().clamp(min, max);
  }

  rotateX(angle: number): this {
    const { y, z } = this;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this.y = cos * y - sin * z;
    this.z = sin * y + cos * z;
    return this;
  }

  rotateY(angle: number): this {
    const { x, z } = this;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this.x = cos * x + sin * z;
    this.z = -sin * x + cos * z;
    return this;
  }

  rotateZ(angle: number): this {
    const { x, y } = this;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this.x = cos * x - sin * y;
    this.y = sin * x + cos * y;
    return this;
  }

  reflect(normal: Vec3): this {
    return this.sub(Vec3.mul(normal, 2 * this.dot(normal)));
  }

  static reflect(v: Vec3, normal: Vec3): Vec3 {
    return v.copy().reflect(normal);
  }

  refract(normal: Vec3, eta: number): this {
    const nDot = this.dot(normal);
    const k = 1 - eta * eta * (1 - nDot * nDot);
    if (k < 0) {
      this.x = this.y = this.z = 0;
      return this;
    }

    return this.sub(Vec3.mul(normal, eta * nDot + Math.sqrt(k)));
  }
}

export function vec3(x?: First, y?: number, z?: number): Vec3 {
  return new Vec3(x, y, z);
}
