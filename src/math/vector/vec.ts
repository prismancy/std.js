export interface Vec extends Float32Array {
  toString(): string;

  copy(): Vec;

  mag(): number;

  setMag(n: number): this;

  magSq(): number;

  limit(max: number): this;

  normalize(): this;
}
