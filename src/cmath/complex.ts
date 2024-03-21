export interface ComplexLike {
  readonly r: number;
  readonly i: number;
}

export class Complex implements ComplexLike {
  constructor(
    public r = 0,
    public i = 0,
  ) {}

  toString(): string {
    return `${this.r} + ${this.i}i`;
  }

  valueOf(): number {
    return this.mag();
  }

  copy(): Complex {
    return complex(this.r, this.i);
  }

  get conj(): Complex {
    return complex(+this.r, -this.i);
  }

  static fromAngle(angle: number, mag = 1): Complex {
    return complex(Math.cos(angle), Math.sin(angle)).mul(mag);
  }

  isReal(): boolean {
    return !this.i;
  }

  add(c: number | ComplexLike): this {
    if (typeof c === "number") {
      this.r += c;
    } else {
      this.r += c.r;
      this.i += c.i;
    }

    return this;
  }

  static add(c1: Complex, c2: number | ComplexLike): Complex {
    return c1.copy().add(c2);
  }

  sub(c: number | ComplexLike): this {
    if (typeof c === "number") {
      this.r -= c;
    } else {
      this.r -= c.r;
      this.i -= c.i;
    }

    return this;
  }

  static sub(c1: Complex, c2: number | ComplexLike): Complex {
    return c1.copy().sub(c2);
  }

  mul(c: number | ComplexLike): this {
    if (typeof c === "number") {
      this.r *= c;
      this.i *= c;
    } else {
      const { r, i } = this;
      this.r = r * c.r - i * c.i;
      this.i = r * c.i + i * c.r;
    }

    return this;
  }

  static mul(c1: Complex, c2: number | ComplexLike): Complex {
    return c1.copy().mul(c2);
  }

  div(c: number | Complex): this {
    if (typeof c === "number") {
      this.r /= c;
      this.i /= c;
    } else {
      const { conj: conjugate } = c;
      this.mul(conjugate).div(c.mul(conjugate).r);
    }

    return this;
  }

  static div(c1: Complex, c2: number | Complex): Complex {
    return c1.copy().div(c2);
  }

  sq(): this {
    const { r, i } = this;
    this.r = r * r - i * i;
    const i2 = r * i;
    this.i = i2 + i2;
    return this;
  }

  mag(): number {
    return Math.sqrt(this.magSq());
  }

  magSq(): number {
    const { r, i } = this;
    return r * r + i * i;
  }

  angle(): number {
    return Math.atan2(this.i, this.r);
  }

  pow(z: ComplexLike): this {
    const { r, i } = this;
    const { r: r2, i: i2 } = z;
    this.r = r ** r2 * i ** i2;
    this.i = r ** i2 * i ** r2;
    return this;
  }
}

export function complex(real?: number, imaginary?: number): Complex {
  return new Complex(real, imaginary);
}
