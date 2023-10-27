function gcd(a: bigint, b: bigint) {
	while (b) {
		const temp = b;
		b = a % b;
		a = temp;
	}

	return a;
}

export type RationalLike = { numerator: bigint; denominator: bigint };

export class Rational {
	constructor(
		public numerator = 0n,
		public denominator = 1n,
	) {}

	toString() {
		return `${this.numerator}/${this.denominator}`;
	}

	valueOf() {
		return Number(this.numerator) / Number(this.denominator);
	}

	simplify() {
		const divisor = gcd(this.numerator, this.denominator);
		this.numerator /= divisor;
		this.denominator /= divisor;
		if (this.denominator < 0n) {
			this.numerator = -this.numerator;
			this.denominator = -this.denominator;
		}

		return this;
	}

	add(r: RationalLike) {
		return new Rational(
			this.numerator * r.denominator + r.numerator * this.denominator,
			this.denominator * r.denominator,
		).simplify();
	}

	sub(r: RationalLike) {
		return new Rational(
			this.numerator * r.denominator - r.numerator * this.denominator,
			this.denominator * r.denominator,
		).simplify();
	}

	mul(r: RationalLike) {
		return new Rational(
			this.numerator * r.numerator,
			this.denominator * r.denominator,
		).simplify();
	}

	div(r: RationalLike) {
		return new Rational(
			this.numerator * r.denominator,
			this.denominator * r.numerator,
		).simplify();
	}
}
