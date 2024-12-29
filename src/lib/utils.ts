import clsx from "clsx";
import { twMerge, type ClassNameValue } from "tailwind-merge";
import { RECAPTCHA_SITE_KEY } from "./constants";

export function cn(...inputs: ClassNameValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Converts a hex color code to HSL.
 * @param hex - The hex color code (e.g., "#FFFFFF" or "FFFFFF").
 * @returns An object containing the HSL values (hue, saturation, lightness).
 */
export function hexToHSL(hex: string): { h: number; s: number; l: number } {
	// Remove the hash if it exists
	hex = hex.replace(/^#/, "");

	// Parse the hex color into RGB components
	const bigint = parseInt(hex, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

	// Normalize RGB values to the range 0-1
	const rNorm = r / 255;
	const gNorm = g / 255;
	const bNorm = b / 255;

	// Find min and max values of RGB components
	const max = Math.max(rNorm, gNorm, bNorm);
	const min = Math.min(rNorm, gNorm, bNorm);
	const delta = max - min;

	// Calculate hue
	let h = 0;
	if (delta === 0) {
		h = 0;
	} else if (max === rNorm) {
		h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) * 60;
	} else if (max === gNorm) {
		h = ((bNorm - rNorm) / delta + 2) * 60;
	} else if (max === bNorm) {
		h = ((rNorm - gNorm) / delta + 4) * 60;
	}

	// Calculate lightness
	const l = (max + min) / 2;

	// Calculate saturation
	const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	return {
		h: Math.round(h),
		s: Math.round(s * 100), // Convert to percentage
		l: Math.round(l * 100), // Convert to percentage
	};
}

export async function generateRecaptchaToken(action: string) {
	return new Promise<string>((resolve, reject) => {
		grecaptcha.enterprise.ready(async () => {
			const token = await grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, {
				action,
			});
			if (token) {
				resolve(token);
			} else {
				reject(new Error("Failed to generate reCAPTCHA token"));
			}
		});
	});
}

export function getCSSVariableValue(name: string, fallback?: string): string {
	const value = getComputedStyle(document.documentElement)
		.getPropertyValue(name)
		.trim();

	if (!value && fallback) {
		return fallback;
	}

	if (value.includes("rem")) {
		return remToPx(parseFloat(value.replace("rem", ""))) + "px";
	}

	return value;
}

function remToPx(rem: number) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
