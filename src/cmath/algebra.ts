import { Complex, complex } from "./complex";
import { csqrt } from "./funcs";

/**
 * Solves ax² + bx + c = 0 for x. In other words, finds the roots of a quadratic equation.
 * @param a the coefficient of x²
 * @param b the coefficient of x
 * @param c the constant
 * @returns An array of roots for the quadratic equation. Any imaginary roots will be NaN.
 */
export function cquadraticRoots(
  a: number,
  b: number,
  c: number,
): [Complex, Complex] {
  const discriminant = b * b - 4 * a * c;
  const d = csqrt(complex(discriminant));
  return [
    Complex.sub(d, b).div(2 * a),
    Complex.sub(d, b)
      .mul(-1)
      .div(2 * a),
  ];
}
