export const serial = (() => {
	let id = 1;
	return () => id++;
})();
