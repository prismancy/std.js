function gcd(a: bigint, b: bigint) {
	while (b) {
		const temp = b;
		b = a % b;
		a = temp;
	}

	return a;
}

/** An object that represents a rational number. */
export type RationalLike = { numerator: bigint; denominator: bigint };

/**
 * A number represented as a ratio of two integers.
 * A numerator and a denominator.
 */
export class Rational {
	constructor(
		public numerator = 0n,
		public denominator = 1n,
	) {}

	toString(): string {
		return `${this.numerator}/${this.denominator}`;
	}

	valueOf(): number {
		return Number(this.numerator) / Number(this.denominator);
	}

	simplify(): this {
		const divisor = gcd(this.numerator, this.denominator);
		this.numerator /= divisor;
		this.denominator /= divisor;
		if (this.denominator < 0n) {
			this.numerator = -this.numerator;
			this.denominator = -this.denominator;
		}

		return this;
	}

	add(r: RationalLike): Rational {
		return new Rational(
			this.numerator * r.denominator + r.numerator * this.denominator,
			this.denominator * r.denominator,
		).simplify();
	}

	sub(r: RationalLike): Rational {
		return new Rational(
			this.numerator * r.denominator - r.numerator * this.denominator,
			this.denominator * r.denominator,
		).simplify();
	}

	mul(r: RationalLike): Rational {
		return new Rational(
			this.numerator * r.numerator,
			this.denominator * r.denominator,
		).simplify();
	}

	div(r: RationalLike): Rational {
		return new Rational(
			this.numerator * r.denominator,
			this.denominator * r.numerator,
		).simplify();
	}
}
