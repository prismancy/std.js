/* eslint-disable max-params */
import { clamp, lerp } from "../funcs";
import { type Vec } from "./vec";

export type Vec4Like =
	| [x: number, y: number, z: number, w: number]
	| Float32Array;
export type ReadonlyVec4Like = Readonly<Vec4Like>;
type First = ReadonlyVec4Like | number;

export class Vec4 extends Float32Array implements Vec {
	static readonly BYTE_LENGTH = 4 * Float32Array.BYTES_PER_ELEMENT;

	constructor(x: First = 0, y?: number, z?: number, w?: number) {
		super();
		if (typeof x === "number") {
			this.x = x;
			this.y = y ?? x;
			this.z = z ?? (y === undefined ? x : 0);
			this.w = w ?? (z === undefined ? x : 0);
		} else {
			[this[0] = 0, this[1] = 0, this[2] = 0, this[3] = 0] = x;
		}
	}

	/* prettier-ignore */ get x() { return this[0] || 0; }
	/* prettier-ignore */ set x(value: number) { this[0] = value; }
	/* prettier-ignore */ get y() { return this[1] || 0; }
	/* prettier-ignore */ set y(value: number) { this[1] = value; }
	/* prettier-ignore */ get z() { return this[2] || 0; }
	/* prettier-ignore */ set z(value: number) { this[2] = value; }
	/* prettier-ignore */ get w() { return this[2] || 0; }
	/* prettier-ignore */ set w(value: number) { this[2] = value; }

	/* prettier-ignore */ get r() { return this[0] || 0; }
	/* prettier-ignore */ set r(value: number) { this[0] = value; }
	/* prettier-ignore */ get g() { return this[1] || 0; }
	/* prettier-ignore */ set g(value: number) { this[1] = value; }
	/* prettier-ignore */ get b() { return this[2] || 0; }
	/* prettier-ignore */ set b(value: number) { this[2] = value; }
	/* prettier-ignore */ get a() { return this[2] || 0; }
	/* prettier-ignore */ set a(value: number) { this[2] = value; }

	override toString() {
		const [x, y, z, w] = this;
		return `vec4 <${x}, ${y}, ${z}, ${w}>`;
	}

	copy() {
		return vec4(...this);
	}

	equals(x: First, y?: number, z?: number, w?: number) {
		if (typeof x === "number")
			return (
				this.x === x &&
				this.y === (y ?? x) &&
				this.z === (z ?? (y === undefined ? x : 0)) &&
				this.w === (w ?? (z === undefined ? x : 0))
			);
		return (
			this.x === x[0] && this.y === x[1] && this.z === x[2] && this.w === x[3]
		);
	}

	add(x: First, y?: number, z?: number, w?: number) {
		if (typeof x === "number") {
			this.x += x;
			this.y += y ?? x;
			this.z += z ?? (y === undefined ? x : 0);
			this.w += w ?? (z === undefined ? x : 0);
		} else {
			this.x += x[0];
			this.y += x[1];
			this.z += x[2];
			this.w += x[3];
		}

		return this;
	}

	static add(v1: Vec4, x: First, y?: number, z?: number, w?: number) {
		return v1.copy().add(x, y, z, w);
	}

	sub(x: First, y?: number, z?: number, w?: number) {
		if (typeof x === "number") {
			this.x -= x;
			this.y -= y ?? x;
			this.z -= z ?? (y === undefined ? x : 0);
			this.w -= w ?? (z === undefined ? x : 0);
		} else {
			this.x -= x[0];
			this.y -= x[1];
			this.z -= x[2];
			this.w -= x[3];
		}

		return this;
	}

	static sub(v1: Vec4, x: First, y?: number, z?: number, w?: number) {
		return v1.copy().sub(x, y, z, w);
	}

	mul(x: First, y?: number, z?: number, w?: number) {
		if (typeof x === "number") {
			this.x *= x;
			this.y *= y ?? x;
			this.z *= z ?? (y === undefined ? x : 1);
			this.w *= w ?? (z === undefined ? x : 1);
		} else {
			this.x *= x[0];
			this.y *= x[1];
			this.z *= x[2];
			this.w *= x[3];
		}

		return this;
	}

	static mul(v1: Vec4, x: First, y?: number, z?: number, w?: number) {
		return v1.copy().mul(x, y, z, w);
	}

	div(x: First, y?: number, z?: number, w?: number) {
		if (typeof x === "number") {
			this.x /= x;
			this.y /= y ?? x;
			this.z /= z ?? (y === undefined ? x : 1);
			this.w /= w ?? (z === undefined ? x : 1);
		} else {
			this.x /= x[0];
			this.y /= x[1];
			this.z /= x[2];
			this.w /= x[3];
		}

		return this;
	}

	static div(v1: Vec4, x: First, y?: number, z?: number, w?: number) {
		return v1.copy().div(x, y, z, w);
	}

	static fma(a: ReadonlyVec4Like, b: ReadonlyVec4Like, c: ReadonlyVec4Like) {
		return vec4(
			a[0] * b[0] + c[0],
			a[1] * b[1] + c[1],
			a[2] * b[2] + c[2],
			a[3] * b[3] + c[3],
		);
	}

	lt(x: ReadonlyVec4Like) {
		return vec4(
			this.x < x[0] ? 1 : 0,
			this.y < x[1] ? 1 : 0,
			this.z < x[2] ? 1 : 0,
			this.w < x[3] ? 1 : 0,
		);
	}

	lte(x: ReadonlyVec4Like) {
		return vec4(
			this.x <= x[0] ? 1 : 0,
			this.y <= x[1] ? 1 : 0,
			this.z <= x[2] ? 1 : 0,
			this.w <= x[3] ? 1 : 0,
		);
	}

	gt(x: ReadonlyVec4Like) {
		return vec4(
			this.x > x[0] ? 1 : 0,
			this.y > x[1] ? 1 : 0,
			this.z > x[2] ? 1 : 0,
			this.w > x[3] ? 1 : 0,
		);
	}

	gte(x: ReadonlyVec4Like) {
		return vec4(
			this.x >= x[0] ? 1 : 0,
			this.y >= x[1] ? 1 : 0,
			this.z >= x[2] ? 1 : 0,
			this.w >= x[3] ? 1 : 0,
		);
	}

	limit(max: number) {
		const maxSq = max * max;
		const magSq = this.magSq();
		if (magSq > maxSq) this.setMag(max);
		return this;
	}

	normalize() {
		const mag = this.mag();
		if (mag !== 0) this.div(mag);
		return this;
	}

	static normalize(v: Vec4) {
		return v.copy().normalize();
	}

	mag() {
		return Math.sqrt(this.magSq());
	}

	setMag(n: number) {
		return this.normalize().mul(n);
	}

	magSq() {
		const { x, y, z, w } = this;
		return x * x + y * y + z * z + w * w;
	}

	dist(v: Vec4) {
		return Math.sqrt(this.distSq(v));
	}

	distSq(v: Vec4) {
		return Vec4.sub(v, this).magSq();
	}

	dot(v: ReadonlyVec4Like) {
		const { x, y, z, w } = this;
		return x * v[0] + y * v[1] + z * v[2] + w * v[3];
	}

	lerp(v: ReadonlyVec4Like, norm: number) {
		const { x, y, z, w } = this;
		this.x = lerp(x, v[0], norm);
		this.y = lerp(y, v[1], norm);
		this.z = lerp(z, v[2], norm);
		this.w = lerp(w, v[3], norm);
		return this;
	}

	static lerp(v1: Vec4, v2: ReadonlyVec4Like, norm: number) {
		return v1.copy().lerp(v2, norm);
	}

	clamp(min: ReadonlyVec4Like, max: ReadonlyVec4Like) {
		const { x, y, z, w } = this;
		this.x = clamp(x, min[0], max[0]);
		this.y = clamp(y, min[1], max[1]);
		this.z = clamp(z, min[2], max[2]);
		this.w = clamp(w, min[3], max[3]);
		return this;
	}

	static clamp(v: Vec4, min: ReadonlyVec4Like, max: ReadonlyVec4Like) {
		return v.copy().clamp(min, max);
	}

	reflect(normal: Vec4) {
		return this.sub(Vec4.mul(normal, 2 * this.dot(normal)));
	}

	static reflect(v: Vec4, normal: Vec4) {
		return v.copy().reflect(normal);
	}

	refract(normal: Vec4, eta: number) {
		const nDot = this.dot(normal);
		const k = 1 - eta * eta * (1 - nDot * nDot);
		if (k < 0) {
			this.x = this.y = this.z = this.w = 0;
			return this;
		}

		return this.sub(Vec4.mul(normal, eta * nDot + Math.sqrt(k)));
	}
}

export function vec4(x?: First, y?: number, z?: number, w?: number) {
	return new Vec4(x, y, z, w);
}
