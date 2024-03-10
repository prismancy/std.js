import { random } from "../../random.ts";
import { clamp, lerp } from "../funcs.ts";
import { type Vec } from "./vec.ts";

export type Vec2Like = [x: number, y: number] | Float32Array;
export type ReadonlyVec2Like = Readonly<Vec2Like>;
type First = ReadonlyVec2Like | number;

export class Vec2 extends Float32Array implements Vec {
	static readonly BYTE_LENGTH = 2 * Float32Array.BYTES_PER_ELEMENT;

	constructor(x: First = 0, y?: number) {
		super([0, 0]);
		if (typeof x === "number") {
			this.x = x;
			this.y = y ?? x;
		} else {
			[this[0] = 0, this[1] = 0] = x;
		}
	}

	/* prettier-ignore */ get x(): number { return this[0] || 0; }
	/* prettier-ignore */ set x(value: number) { this[0] = value; }
	/* prettier-ignore */ get y(): number { return this[1] || 0; }
	/* prettier-ignore */ set y(value: number) { this[1] = value; }

	override toString(): string {
		const [x, y] = this;
		return `vec2 <${x}, ${y}>`;
	}

	copy(): Vec2 {
		return vec2(...this);
	}

	static random(mag = 1): Vec2 {
		return vec2(1, 0)
			.rotate(random(Math.PI * 2))
			.setMag(mag);
	}

	eq(x: First, y?: number): boolean {
		if (typeof x === "number") return this.x === x && this.y === (y ?? x);
		return this.x === x[0] && this.y === x[1];
	}

	add(x: First, y?: number): this {
		if (typeof x === "number") {
			this.x += x;
			this.y += y ?? x;
		} else {
			this.x += x[0];
			this.y += x[1];
		}

		return this;
	}

	static add(v1: Vec2, x: First, y?: number): Vec2 {
		return v1.copy().add(x, y);
	}

	sub(x: First, y?: number): this {
		if (typeof x === "number") {
			this.x -= x;
			this.y -= y ?? x;
		} else {
			this.x -= x[0];
			this.y -= x[1];
		}

		return this;
	}

	static sub(v1: Vec2, x: First, y?: number): Vec2 {
		return v1.copy().sub(x, y);
	}

	mul(x: First, y?: number): this {
		if (typeof x === "number") {
			this.x *= x;
			this.y *= y ?? x;
		} else {
			this.x *= x[0];
			this.y *= x[1];
		}

		return this;
	}

	static mul(v1: Vec2, x: First, y?: number): Vec2 {
		return v1.copy().mul(x, y);
	}

	div(x: First, y?: number): this {
		if (typeof x === "number") {
			this.x *= x;
			this.y *= y ?? x;
		} else {
			this.x *= x[0];
			this.y *= x[1];
		}

		return this;
	}

	static div(v1: Vec2, x: First, y?: number): Vec2 {
		return v1.copy().div(x, y);
	}

	static fma(
		a: ReadonlyVec2Like,
		b: ReadonlyVec2Like,
		c: ReadonlyVec2Like,
	): Vec2 {
		return vec2(a[0] * b[0] + c[0], a[1] * b[1] + c[1]);
	}

	lt(x: ReadonlyVec2Like): Vec2 {
		return vec2(this.x < x[0] ? 1 : 0, this.y < x[1] ? 1 : 0);
	}

	lte(x: ReadonlyVec2Like): Vec2 {
		return vec2(this.x <= x[0] ? 1 : 0, this.y <= x[1] ? 1 : 0);
	}

	gt(x: ReadonlyVec2Like): Vec2 {
		return vec2(this.x > x[0] ? 1 : 0, this.y > x[1] ? 1 : 0);
	}

	gte(x: ReadonlyVec2Like): Vec2 {
		return vec2(this.x >= x[0] ? 1 : 0, this.y >= x[1] ? 1 : 0);
	}

	mag(): number {
		return Math.sqrt(this.magSq());
	}

	setMag(n: number): this {
		return this.normalize().mul(n);
	}

	magSq(): number {
		const { x, y } = this;
		return x * x + y * y;
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

	static normalize(v: Vec2): Vec2 {
		return v.copy().normalize();
	}

	dist(v: Vec2): number {
		return Math.sqrt(this.distSq(v));
	}

	distSq(v: Vec2): number {
		return Vec2.sub(v, this).magSq();
	}

	dot(v: ReadonlyVec2Like): number {
		return this.x * v[0] + this.y * v[1];
	}

	cross(v: ReadonlyVec2Like): number {
		return this.x * v[1] - this.y * v[0];
	}

	lerp(v: ReadonlyVec2Like, norm: number): this {
		const { x, y } = this;
		this.x = lerp(x, v[0], norm);
		this.y = lerp(y, v[1], norm);
		return this;
	}

	static lerp(v1: Vec2, v2: ReadonlyVec2Like, norm: number): Vec2 {
		return v1.copy().lerp(v2, norm);
	}

	clamp(min: ReadonlyVec2Like, max: ReadonlyVec2Like): this {
		const { x, y } = this;
		this.x = clamp(x, min[0], max[0]);
		this.y = clamp(y, min[1], max[1]);
		return this;
	}

	static clamp(v: Vec2, min: ReadonlyVec2Like, max: ReadonlyVec2Like): Vec2 {
		return v.copy().clamp(min, max);
	}

	perp(): Vec2 {
		return vec2(this.y, -this.x);
	}

	angle(): number {
		return Math.atan2(this.y, this.x);
	}

	setAngle(a: number): this {
		const mag = this.mag();
		this.x = Math.cos(a) * mag;
		this.y = Math.sin(a) * mag;
		return this;
	}

	static fromAngle(a: number, mag = 1): Vec2 {
		return vec2(mag).setAngle(a);
	}

	rotate(angle: number): this {
		const { x, y } = this;
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		this.x = cos * x - sin * y;
		this.y = sin * x + cos * y;
		return this;
	}

	static rotate(v: Vec2, angle: number): Vec2 {
		return v.copy().rotate(angle);
	}

	rotateAbout(angle: number, center: Vec2): this {
		return this.sub(center).rotate(angle).add(center);
	}

	reflect(normal: Vec2): this {
		return this.sub(Vec2.mul(normal, 2 * this.dot(normal)));
	}

	refract(normal: Vec2, eta: number): this {
		const dot = this.dot(normal);
		const k = 1 - eta * eta * (1 - dot * dot);
		if (k < 0) {
			this.x = this.y = 0;
			return this;
		}

		return this.mul(eta).sub(Vec2.mul(normal, eta * dot + Math.sqrt(k)));
	}
}

export function vec2(x?: First, y?: number): Vec2 {
	return new Vec2(x, y);
}
