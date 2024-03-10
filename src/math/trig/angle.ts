/** The ratio to convert degrees to radians */
export const DEG2RAD = Math.PI / 180;

/** Converts radians to degrees */
export const degrees = (radians: number): number => radians / DEG2RAD;

/** Converts degrees to radians */
export const radians = (degrees: number): number => degrees * DEG2RAD;
