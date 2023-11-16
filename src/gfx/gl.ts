import {
	type ReadonlyMat2Like,
	type ReadonlyMat3Like,
	type ReadonlyMat4Like,
	type ReadonlyVec2Like,
	type ReadonlyVec3Like,
	type ReadonlyVec4Like,
} from "../math";
import { type uint, type Result, type int } from "../types";
import { screenIndexData, screenVertexData } from "./screen";
import Shader from "./shader";

interface GLBuffer {
	buffer: WebGLBuffer;
	data: number[][][];
	flatData: number[];
}

type AttributeType =
	| "float"
	| "vec2"
	| "vec3"
	| "vec4"
	| "mat2"
	| "mat3"
	| "mat4";
const inputSizes: Record<AttributeType, number> = {
	float: 1,
	vec2: 2,
	vec3: 3,
	vec4: 4,
	mat2: 4,
	mat3: 9,
	mat4: 16,
};
type Vec2 = readonly [x: number, y: number];
type Vec3 = readonly [x: number, y: number, z: number];
type Vec4 = readonly [x: number, y: number, z: number, w: number];
interface UniformData {
	int: int;
	"int[]": int[];
	float: number;
	"float[]": number[];
	ivec2: Vec2;
	"ivec2[]": Vec2[];
	vec2: ReadonlyVec2Like;
	"vec2[]": ReadonlyVec2Like[];
	ivec3: Vec3;
	"ivec3[]": Vec3[];
	vec3: ReadonlyVec3Like;
	"vec3[]": ReadonlyVec3Like[];
	ivec4: Vec4;
	"ivec4[]": Vec4[];
	vec4: ReadonlyVec4Like;
	"vec4[]": ReadonlyVec4Like[];
	mat2: ReadonlyMat2Like;
	mat3: ReadonlyMat3Like;
	mat4: ReadonlyMat4Like;
	struct: Record<string, StructType<keyof UniformData>>;
	"struct[]": Array<Record<string, StructType<keyof UniformData>>>;
}
interface StructType<T extends keyof UniformData> {
	type: T;
	data: UniformData[T];
}

export class GL {
	program!: WebGLProgram;

	vertexShader!: Shader;
	fragmentShader!: Shader;

	vertexBuffer!: GLBuffer;
	indexBuffer!: GLBuffer;

	attributeLocations = new Map<string, GLint>();
	uniformLocations = new Map<string, WebGLUniformLocation>();

	onResize?: () => void;
	private animateHandle = Number.NaN;

	constructor(public gl: WebGLRenderingContext) {}

	/**
	 * Resizes the canvas to a width and height
	 * @param w the width
	 * @param h the height
	 */
	resize(w: uint, h: uint) {
		const { gl } = this;
		const { canvas } = gl;

		const dpr = window.devicePixelRatio;
		const width = w * dpr;
		const height = h * dpr;

		canvas.width = width;
		canvas.height = height;

		if (canvas instanceof HTMLCanvasElement) {
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
		}

		gl.viewport(0, 0, width, height);

		return this;
	}

	/**
	 * Creates a vertex shader from its source text
	 * @param source the source of the vertex shader
	 */
	createVertexShader(source: string) {
		return Shader.from(this.gl, "vertex", source);
	}

	/**
	 * Creates a fragment shader from its source text
	 * @param source the source of the fragment shader
	 */
	createFragmentShader(source: string) {
		return Shader.from(this.gl, "fragment", source);
	}

	/**
	 * Creates a program to run in WebGL
	 * @param vertexShader
	 * @param fragmentShader
	 */
	createProgram(
		vertexShader: Shader,
		fragmentShader: Shader,
	): Result<WebGLProgram> {
		const { gl } = this;
		const program = gl.createProgram();
		if (!program) return [undefined, new Error("Error creating program")];

		vertexShader.attach(program);
		fragmentShader.attach(program);

		// Check for program errors
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS))
			return [
				undefined,
				new Error(`Error linking program: ${gl.getProgramInfoLog(program)}`),
			];

		gl.validateProgram(program);
		if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
			return [
				undefined,
				new Error(`Error validating program: ${gl.getProgramInfoLog(program)}`),
			];

		this.program = program;
		gl.useProgram(program);
		return [program, undefined];
	}

	createProgramFromSources(vertexSource: string, fragmentSource: string) {
		const [vertexShader, vertexShaderError] =
			this.createVertexShader(vertexSource);
		if (vertexShaderError) return vertexShaderError;

		const [fragmentShader, fragmentShaderError] =
			this.createFragmentShader(fragmentSource);
		if (fragmentShaderError) return fragmentShaderError;

		return this.createProgram(vertexShader, fragmentShader);
	}

	screen() {
		this.createVertexBuffer(screenVertexData);
		this.createIndexBuffer(screenIndexData);
		return this;
	}

	/**
	 * Creates a vertex buffer
	 * @param data the data for the buffer
	 */
	createVertexBuffer(data: number[][][]) {
		const { gl } = this;
		const buffer = gl.createBuffer()!;
		const flatData = data.flat(2);
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(flatData), gl.STATIC_DRAW);

		this.vertexBuffer = { buffer, data, flatData };
		return buffer;
	}

	/**
	 * Creates an index buffer
	 * @param data the data for the buffer
	 */
	createIndexBuffer(data: uint[][][]) {
		const { gl } = this;
		const buffer = gl.createBuffer()!;
		const flatData = data.flat(2);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
		gl.bufferData(
			gl.ELEMENT_ARRAY_BUFFER,
			new Uint16Array(flatData),
			gl.STATIC_DRAW,
		);

		this.indexBuffer = { buffer, data, flatData };
		return buffer;
	}

	/**
	 * Gets the location of a attribute
	 * @param name the name of the attribute
	 */
	getAttributeLocation(name: string) {
		let attributeLocation = this.attributeLocations.get(name);
		if (attributeLocation !== undefined) return attributeLocation;

		attributeLocation = this.gl.getAttribLocation(this.program, name);
		if (attributeLocation !== -1)
			this.attributeLocations.set(name, attributeLocation);
		return attributeLocation;
	}

	/**
	 * Gets the location of a uniform
	 * @param name the name of the uniform
	 */
	getUniformLocation(name: string) {
		const uniformLocation = this.uniformLocations.get(name);
		if (uniformLocation !== undefined) return uniformLocation;

		const location = this.gl.getUniformLocation(this.program, name);
		if (location) this.uniformLocations.set(name, location);
		return location;
	}

	attributes(inputs: Array<{ name: string; type: AttributeType }>) {
		const { gl } = this;
		let offset = 0;
		const stride = inputs.reduce(
			(acc, { type }) =>
				acc + inputSizes[type] * Float32Array.BYTES_PER_ELEMENT,
			0,
		);
		for (const { name, type } of inputs) {
			const size = inputSizes[type];
			this.createAttribute(name, [size, gl.FLOAT, false, stride, offset]);
			offset += size * Float32Array.BYTES_PER_ELEMENT;
		}

		return this;
	}

	// eslint-disable-next-line complexity
	uniform<T extends keyof UniformData>(
		name: string,
		type: T,
		data: UniformData[T],
	) {
		const { gl } = this;
		const location = this.getUniformLocation(name);
		switch (type) {
			case "int": {
				gl.uniform1i(location, data as UniformData["int"]);
				break;
			}

			case "int[]": {
				for (const [i, value] of (data as UniformData["int[]"]).entries())
					this.uniform(`${name}[${i}]`, "int", value);
				break;
			}

			case "float": {
				gl.uniform1f(location, data as UniformData["float"]);
				break;
			}

			case "float[]": {
				for (const [i, value] of (data as UniformData["float[]"]).entries())
					this.uniform(`${name}[${i}]`, "float", value);
				break;
			}

			case "ivec2": {
				gl.uniform2i(location, ...(data as UniformData["ivec2"]));
				break;
			}

			case "ivec2[]": {
				for (const [i, value] of (data as UniformData["ivec2[]"]).entries())
					this.uniform(`${name}[${i}]`, "ivec2", value);
				break;
			}

			case "vec2": {
				const [x = 0, y = 0] = data as UniformData["vec2"];
				gl.uniform2f(location, x, y);
				break;
			}

			case "vec2[]": {
				for (const [i, value] of (data as UniformData["vec2[]"]).entries())
					this.uniform(`${name}[${i}]`, "vec2", value);
				break;
			}

			case "ivec3": {
				gl.uniform3i(location, ...(data as UniformData["ivec3"]));
				break;
			}

			case "ivec3[]": {
				for (const [i, value] of (data as UniformData["ivec3[]"]).entries())
					this.uniform(`${name}[${i}]`, "ivec3", value);
				break;
			}

			case "vec3": {
				const [x = 0, y = 0, z = 0] = data as UniformData["vec3"];
				gl.uniform3f(location, x, y, z);
				break;
			}

			case "vec3[]": {
				for (const [i, value] of (data as UniformData["vec3[]"]).entries())
					this.uniform(`${name}[${i}]`, "vec3", value);
				break;
			}

			case "ivec4": {
				gl.uniform4i(location, ...(data as UniformData["ivec4"]));
				break;
			}

			case "ivec4[]": {
				for (const [i, value] of (data as UniformData["ivec4[]"]).entries())
					this.uniform(`${name}[${i}]`, "ivec4", value);
				break;
			}

			case "vec4": {
				const [x = 0, y = 0, z = 0, w = 0] = data as UniformData["vec4"];
				gl.uniform4f(location, x, y, z, w);
				break;
			}

			case "vec4[]": {
				for (const [i, value] of (data as UniformData["vec4[]"]).entries())
					this.uniform(`${name}[${i}]`, "vec4", value);
				break;
			}

			case "mat2": {
				gl.uniformMatrix2fv(
					location,
					false,
					new Float32Array(data as UniformData["mat2"]),
				);
				break;
			}

			case "mat3": {
				gl.uniformMatrix3fv(
					location,
					false,
					new Float32Array(data as UniformData["mat3"]),
				);
				break;
			}

			case "mat4": {
				gl.uniformMatrix4fv(
					location,
					false,
					new Float32Array(data as UniformData["mat4"]),
				);
				break;
			}

			case "struct": {
				for (const [key, { type, data: value }] of Object.entries(
					data as UniformData["struct"],
				)) {
					this.uniform(`${name}.${key}`, type, value);
				}

				break;
			}

			case "struct[]": {
				for (const [i, value] of (data as UniformData["struct[]"]).entries())
					this.uniform(`${name}[${i}]`, "struct", value);
			}
		}

		return this;
	}

	/**
	 *
	 * @param name the name of the attribute
	 * @param config
	 * Number of elements per attribute,
	 * Type of elements,
	 * Is it normalized?,
	 * Size of an individual vertex,
	 * Offset from the beginning of a single vertex to this attribute
	 * @returns the attribute location
	 */
	createAttribute(
		name: string,
		config: [
			size: GLint,
			type: GLenum,
			normalized: GLboolean,
			stride: GLsizei,
			offset: GLintptr,
		],
	) {
		const { gl } = this;
		const attributeLocation = this.getAttributeLocation(name);
		gl.vertexAttribPointer(attributeLocation, ...config);
		gl.enableVertexAttribArray(attributeLocation);
		return attributeLocation;
	}

	/**
	 * Fills the canvas with a background color
	 * @param r red value
	 * @param g green value
	 * @param b blue value
	 * @param a alpha value
	 */
	background(r: number, g: number, b: number, a = 1) {
		const { gl } = this;
		gl.clearColor(r, g, b, a);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		return this;
	}

	/**
	 * Draws triangles based on the index buffer
	 */
	render() {
		const { gl } = this;
		gl.drawElements(
			gl.TRIANGLES, // Type of shape
			this.indexBuffer.flatData.length, // Number of vertices
			gl.UNSIGNED_SHORT, // Type of the indices
			0, // Where to start
		);
		return this;
	}

	animate() {
		const fn = () => {
			this.render();
			this.animateHandle = requestAnimationFrame(fn);
		};

		this.animateHandle = requestAnimationFrame(fn);
		return () => {
			cancelAnimationFrame(this.animateHandle);
		};
	}

	remove() {
		const { gl } = this;
		gl.deleteBuffer(this.indexBuffer.buffer);
		gl.deleteBuffer(this.vertexBuffer.buffer);
		cancelAnimationFrame(this.animateHandle);
		if (this.onResize) window.removeEventListener("resize", this.onResize);
	}
}
