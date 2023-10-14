export interface ComplexLike {
	readonly real: number;
	readonly imaginary: number;
}

export class Complex implements ComplexLike {
	constructor(
		public real = 0,
		public imaginary = 0,
	) {}

	toString() {
		return `${this.real} + ${this.imaginary}i`;
	}

	valueOf() {
		return this.toString();
	}

	copy(): Complex {
		return complex(+this.real, +this.imaginary);
	}

	get conjugate(): Complex {
		return complex(+this.real, -this.imaginary);
	}

	static fromAngle(angle: number, mag = 1): Complex {
		return complex(Math.cos(angle), Math.sin(angle)).mult(mag);
	}

	add(c: number | ComplexLike): this {
		if (typeof c === "number") {
			this.real += c;
			return this;
		}

		this.real += c.real;
		this.imaginary += c.imaginary;
		return this;
	}

	sub(c: number | ComplexLike): this {
		if (typeof c === "number") {
			this.real -= c;
			return this;
		}

		this.real -= c.real;
		this.imaginary -= c.imaginary;
		return this;
	}

	mult(c: number | ComplexLike): this {
		if (typeof c === "number") {
			this.real *= c;
			this.imaginary *= c;
			return this;
		}

		const { real, imaginary } = this;
		this.real = real * c.real - imaginary * c.imaginary;
		this.imaginary = real * c.imaginary + imaginary * c.real;
		return this;
	}

	div(c: number | Complex): this {
		if (typeof c === "number") {
			this.real /= c;
			this.imaginary /= c;
			return this;
		}

		const { conjugate } = c;
		return this.mult(conjugate).div(c.mult(conjugate).real);
	}

	sq(): this {
		const { real, imaginary } = this;
		this.real = real ** 2 - imaginary ** 2;
		this.imaginary = 2 * real * imaginary;
		return this;
	}

	mag(): number {
		return Math.sqrt(this.magSq());
	}

	magSq(): number {
		return this.real ** 2 + this.imaginary ** 2;
	}

	angle(): number {
		return Math.atan2(this.imaginary, this.real);
	}

	pow(c: ComplexLike): this {
		const { real, imaginary } = this;
		const { real: re, imaginary: im } = c;
		this.real = real ** re * imaginary ** im;
		this.imaginary = real ** im * imaginary ** re;
		return this;
	}
}

export function complex(real?: number, imaginary?: number): Complex {
	return new Complex(real, imaginary);
}
