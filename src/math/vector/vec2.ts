import { random } from "../../random";
import { clamp, lerp } from "../funcs";
import { type Vector } from "./vec";

export type Vector2Like = { x: number; y: number };
type First = Vector2 | [x: number, y: number] | number;

export class Vector2 implements Vector, Vector2Like {
	x!: number;
	y!: number;

	constructor(x: First = 0, y?: number) {
		this.set(x, y);
	}

	toString() {
		const { x, y } = this;
		return `vec2 <${x}, ${y}>`;
	}

	toJSON() {
		const { x, y } = this;
		return { x, y };
	}

	toArray(): [x: number, y: number] {
		return [this.x, this.y];
	}

	copy() {
		return vec2(this.x, this.y);
	}

	log() {
		console.log(this.toString());
		return this;
	}

	set(x: First, y?: number) {
		if (x instanceof Vector2) {
			this.x = x.x;
			this.y = x.y;
		} else if (Array.isArray(x)) {
			[this.x, this.y] = x;
		} else if (y === undefined) {
			this.x = x;
			this.y = x;
		} else {
			this.x = x;
			this.y = y || 0;
		}

		return this;
	}

	static random(mag = 1) {
		return vec2(1, 0)
			.rotate(random(Math.PI * 2))
			.setMag(mag);
	}

	equals(x: First, y = 0) {
		if (x instanceof Vector2) return this.x === x.x && this.y === x.y;
		if (Array.isArray(x)) return this.x === x[0] && this.y === x[1];
		return this.x === x && this.y === y;
	}

	add(x: First, y?: number) {
		if (x instanceof Vector2) {
			this.x += x.x;
			this.y += x.y;
		} else if (Array.isArray(x)) {
			this.x += x[0];
			this.y += x[1];
		} else if (y === undefined) {
			this.x += x;
			this.y += x;
		} else {
			this.x += x;
			this.y += y || 0;
		}

		return this;
	}

	static add(v1: Vector2, x: First, y?: number) {
		return v1.copy().add(x, y);
	}

	sub(x: First, y?: number) {
		if (x instanceof Vector2) {
			this.x -= x.x;
			this.y -= x.y;
		} else if (Array.isArray(x)) {
			this.x -= x[0];
			this.y -= x[1];
		} else if (y === undefined) {
			this.x -= x;
			this.y -= x;
		} else {
			this.x -= x;
			this.y -= y || 0;
		}

		return this;
	}

	static sub(v1: Vector2, x: First, y?: number) {
		return v1.copy().sub(x, y);
	}

	mult(x: First, y?: number) {
		if (x instanceof Vector2) {
			this.x *= x.x;
			this.y *= x.y;
		} else if (Array.isArray(x)) {
			this.x *= x[0];
			this.y *= x[1];
		} else if (y === undefined) {
			this.x *= x;
			this.y *= x;
		} else {
			this.x *= x;
			this.y *= y ?? 1;
		}

		return this;
	}

	static mult(v1: Vector2, x: First, y?: number) {
		return v1.copy().mult(x, y);
	}

	div(x: First, y?: number) {
		if (x instanceof Vector2) {
			this.x /= x.x;
			this.y /= x.y;
		} else if (Array.isArray(x)) {
			this.x /= x[0];
			this.y /= x[1];
		} else if (y === undefined) {
			this.x /= x;
			this.y /= x;
		} else {
			this.x /= x;
			this.y /= y ?? 1;
		}

		return this;
	}

	static div(v1: Vector2, x: First, y?: number) {
		return v1.copy().div(x, y);
	}

	static fma(a: Vector2Like, b: Vector2Like, c: Vector2Like) {
		return vec2(a.x * b.x + c.x, a.y * b.y + c.y);
	}

	lt(x: Vector2Like) {
		return vec2(this.x < x.x ? 1 : 0, this.y < x.y ? 1 : 0);
	}

	lte(x: Vector2Like) {
		return vec2(this.x <= x.x ? 1 : 0, this.y <= x.y ? 1 : 0);
	}

	gt(x: Vector2Like) {
		return vec2(this.x > x.x ? 1 : 0, this.y > x.y ? 1 : 0);
	}

	gte(x: Vector2Like) {
		return vec2(this.x >= x.x ? 1 : 0, this.y >= x.y ? 1 : 0);
	}

	mag() {
		return Math.sqrt(this.magSq());
	}

	setMag(n: number) {
		return this.normalize().mult(n);
	}

	magSq() {
		const { x, y } = this;
		return x ** 2 + y ** 2;
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

	static normalize(v: Vector2) {
		return v.copy().normalize();
	}

	dist(v: Vector2) {
		return Math.sqrt(this.distSq(v));
	}

	distSq(v: Vector2) {
		return Vector2.sub(v, this).magSq();
	}

	dot(v: Vector2Like) {
		return this.x * v.x + this.y * v.y;
	}

	cross(v: Vector2Like) {
		return this.x * v.y - this.y * v.x;
	}

	lerp(v: Vector2Like, norm: number) {
		const { x, y } = this;
		this.x = lerp(x, v.x, norm);
		this.y = lerp(y, v.y, norm);
		return this;
	}

	static lerp(v1: Vector2, v2: Vector2Like, norm: number) {
		return v1.copy().lerp(v2, norm);
	}

	clamp(min: Vector2Like, max: Vector2Like) {
		const { x, y } = this;
		this.x = clamp(x, min.x, max.x);
		this.y = clamp(y, min.y, max.y);
		return this;
	}

	static clamp(v: Vector2, min: Vector2Like, max: Vector2Like) {
		return v.copy().clamp(min, max);
	}

	perp() {
		return vec2(this.y, -this.x);
	}

	angle() {
		return Math.atan2(this.y, this.x);
	}

	setAngle(a: number) {
		const mag = this.mag();
		return this.set(Math.cos(a) * mag, Math.sin(a) * mag);
	}

	static fromAngle(a: number, mag = 1) {
		return vec2(mag).setAngle(a);
	}

	rotate(angle: number) {
		const { x, y } = this;
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		this.x = cos * x - sin * y;
		this.y = sin * x + cos * y;
		return this;
	}

	static rotate(v: Vector2, angle: number) {
		return v.copy().rotate(angle);
	}

	rotateAbout(angle: number, center: Vector2) {
		return this.sub(center).rotate(angle).add(center);
	}

	reflect(normal: Vector2) {
		return this.sub(Vector2.mult(normal, 2 * this.dot(normal)));
	}

	refract(normal: Vector2, eta: number) {
		const dot = this.dot(normal);
		const k = 1 - eta * eta * (1 - dot * dot);
		if (k < 0) return this.set(0, 0);
		return this.mult(eta).sub(Vector2.mult(normal, eta * dot + Math.sqrt(k)));
	}
}

export function vec2(x?: First, y?: number) {
	return new Vector2(x, y);
}
