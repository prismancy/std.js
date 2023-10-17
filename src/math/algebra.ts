/**
 * Solves ax² + bx + c = 0 for x. In other words, finds the roots of a quadratic equation.
 * @param a the coefficient of x²
 * @param b the coefficient of x
 * @param c the constant
 * @returns An array of roots for the quadratic equation. Any imaginary roots will be NaN.
 */
export function quadraticRoots(a: number, b: number, c: number) {
	const discriminant = b * b - 4 * a * c;
	const d = Math.sqrt(discriminant);
	return [(-b + d) / (2 * a), (-b - d) / (2 * a)];
}
