import { type Result } from "../types";

export type ShaderType = "vertex" | "fragment";

export default class Shader {
	shader: WebGLShader;

	constructor(
		private readonly gl: WebGLRenderingContext,
		readonly type: ShaderType,
		source: string,
	) {
		// This will never be null because we're passing always valid shader type enums
		const shader = gl.createShader(
			type === "vertex" ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER,
		)!;
		gl.shaderSource(shader, source);
		this.shader = shader;
	}

	static from(
		gl: WebGLRenderingContext,
		type: ShaderType,
		source: string,
	): Result<Shader> {
		const shader = new Shader(gl, type, source);

		// Check for shader errors
		gl.compileShader(shader.shader);
		if (!gl.getShaderParameter(shader.shader, gl.COMPILE_STATUS))
			return [
				undefined,
				new Error(
					`Error compiling ${type} shader: ${gl.getShaderInfoLog(
						shader.shader,
					)}`,
				),
			];

		return [shader, undefined];
	}

	attach(program: WebGLProgram) {
		this.gl.attachShader(program, this.shader);
	}

	detach(program: WebGLProgram) {
		this.gl.detachShader(program, this.shader);
	}

	remove() {
		this.gl.deleteShader(this.shader);
	}
}
