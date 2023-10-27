import { type Dict } from "../../types";

export interface Vector {
	toString(): string;
	toJSON(): Dict<number>;
	toArray(): number[];

	copy(): Vector;

	log(): this;

	mag(): number;

	setMag(n: number): this;

	magSq(): number;

	limit(max: number): this;

	normalize(): this;
}
