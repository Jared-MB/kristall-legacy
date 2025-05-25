export function generateTonesFromRGB(rgb: {
	r: number;
	g: number;
	b: number;
}) {
	const r = Math.min(255, Math.max(0, rgb.r));
	const g = Math.min(255, Math.max(0, rgb.g));
	const b = Math.min(255, Math.max(0, rgb.b));

	const distR = 255 - r;
	const distG = 255 - g;
	const distB = 255 - b;

	const coefficients = {
		400: 0.25,
		300: 0.55,
		200: 0.8,
		100: 0.92,
	};

	const tones = {
		500: { r, g, b },
		400: {
			r: Math.round(r + distR * coefficients[400]),
			g: Math.round(g + distG * coefficients[400]),
			b: Math.round(b + distB * coefficients[400]),
		},
		300: {
			r: Math.round(r + distR * coefficients[300]),
			g: Math.round(g + distG * coefficients[300]),
			b: Math.round(b + distB * coefficients[300]),
		},
		200: {
			r: Math.round(r + distR * coefficients[200]),
			g: Math.round(g + distG * coefficients[200]),
			b: Math.round(b + distB * coefficients[200]),
		},
		100: {
			r: Math.round(r + distR * coefficients[100]),
			g: Math.round(g + distG * coefficients[100]),
			b: Math.round(b + distB * coefficients[100]),
		},
	};

	return tones;
}

export function hexToRGB(color: string) {
	const hex = color.replace(/^#/, "");

	let r: number;
	let g: number;
	let b: number;

	if (hex.length === 3) {
		r = Number.parseInt(hex.charAt(0) + hex.charAt(0), 16);
		g = Number.parseInt(hex.charAt(1) + hex.charAt(1), 16);
		b = Number.parseInt(hex.charAt(2) + hex.charAt(2), 16);
	} else if (hex.length === 6) {
		r = Number.parseInt(hex.substring(0, 2), 16);
		g = Number.parseInt(hex.substring(2, 4), 16);
		b = Number.parseInt(hex.substring(4, 6), 16);
	} else {
		throw new Error("Invalid hex color format");
	}

	return { r, g, b };
}

export function rgbToHex(rgb: { r: number; g: number; b: number }) {
	const r = Math.min(255, Math.max(0, rgb.r)).toString(16);
	const g = Math.min(255, Math.max(0, rgb.g)).toString(16);
	const b = Math.min(255, Math.max(0, rgb.b)).toString(16);

	return `#${r}${g}${b}`;
}
