import { type Complex, complex, type ComplexLike } from "./complex.ts";

export function csqrt(z: Complex): Complex {
  const { r, i } = z;
  const mag = z.mag();
  const r2 = Math.sqrt(0.5 * (mag + r));
  const i2 = Math.sign(i) * Math.sqrt(0.5 * (mag - r));
  return complex(r2, i2);
}

export function clog(z: Complex): Complex {
  return complex(Math.log(z.mag()), z.angle());
}

export const cln = clog;

export function cexp({ r, i }: ComplexLike): Complex {
  const er = Math.exp(r);
  return complex(er * Math.cos(i), er * Math.sin(i));
}

export function csin({ r, i }: ComplexLike): Complex {
  return complex(Math.sin(r) * Math.cosh(i), Math.cos(r) * Math.sinh(i));
}

export function ccos({ r, i }: ComplexLike): Complex {
  return complex(Math.cos(r) * Math.cosh(i), -Math.sin(r) * Math.sinh(i));
}

export function ctan(z: ComplexLike): Complex {
  return csin(z).div(ccos(z));
}

export function casin({ r, i }: ComplexLike): Complex {
  return complex(Math.asin(r) * Math.cosh(i), Math.acos(r) * Math.sinh(i));
}

export function cacos({ r, i }: ComplexLike): Complex {
  return complex(Math.acos(r) * Math.cosh(i), -Math.asin(r) * Math.sinh(i));
}

export function catan({ r, i }: ComplexLike): Complex {
  return complex(Math.atan(r) * Math.cosh(i), Math.atan(r) * Math.sinh(i));
}

export function csinh({ r, i }: ComplexLike): Complex {
  return complex(Math.sinh(r) * Math.cos(i), Math.cosh(r) * Math.sin(i));
}

export function ccosh({ r, i }: ComplexLike): Complex {
  return complex(Math.cosh(r) * Math.cos(i), Math.sinh(r) * Math.sin(i));
}

export function ctanh(z: ComplexLike): Complex {
  return csinh(z).div(ccosh(z));
}

export function casinh({ r, i }: ComplexLike): Complex {
  return complex(Math.asinh(r) * Math.cos(i), Math.acosh(r) * Math.sin(i));
}

export function cacosh({ r, i }: ComplexLike): Complex {
  return complex(Math.acosh(r) * Math.cos(i), Math.asinh(r) * Math.sin(i));
}

export function catanh({ r, i }: ComplexLike): Complex {
  return complex(Math.atanh(r) * Math.cos(i), Math.atanh(r) * Math.sin(i));
}
