import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		colors: {
			foreground: "hsla(var(--foreground))",
			background: "hsla(var(--background))",
			white: "#FFFFFF",
			black: "#000000",
			gray: {
				50: "hsla(var(--gray-50))",
				100: "hsla(var(--gray-100))",
				200: "hsla(var(--gray-200))",
				300: "hsla(var(--gray-300))",
				400: "hsla(var(--gray-400))",
				500: "hsla(var(--gray-500))",
				600: "hsla(var(--gray-600))",
				700: "hsla(var(--gray-700))",
				800: "hsla(var(--gray-800))",
				900: "hsla(var(--gray-900))",
				950: "hsla(var(--gray-950))",
			},
			primary: {
				50: "hsla(var(--primary-50))",
				100: "hsla(var(--primary-100))",
				200: "hsla(var(--primary-200))",
				300: "hsla(var(--primary-300))",
				400: "hsla(var(--primary-400))",
				500: "hsla(var(--primary-500))",
				600: "hsla(var(--primary-600))",
				700: "hsla(var(--primary-700))",
				800: "hsla(var(--primary-800))",
				900: "hsla(var(--primary-900))",
				950: "hsla(var(--primary-950))",
			},
			transparent: "transparent",
			inherit: "inherit",
			current: "currentColor",
		},
		extend: {
			flex: {
				2: "2 2 0%",
				3: "3 3 0%",
			},
			animation: {
				wave: "wave 5s ease-in-out infinite",
				"fade-in": "fade-in 0.75s ease-in-out",
			},
			keyframes: {
				wave: {
					"0%, 80%, 100%": { transform: "initial" },
					"20%, 50%": { transform: "rotate(10deg)" },
					"35%, 65%": { transform: "rotate(-8deg)" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
			},
			screens: {
				lg: "1152px",
			},
		},
	},
	plugins: [require("tailwind-scrollbar")],
} satisfies Config;
