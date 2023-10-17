function gcd(a: bigint, b: bigint) {
	while (b !== 0n) {
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

	simplify() {
		const divisor = gcd(this.numerator, this.denominator);
		this.numerator /= divisor;
		this.denominator /= divisor;
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
