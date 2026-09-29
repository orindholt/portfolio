import { Variants } from "motion/react";

export const tooltip: Variants = {
	hidden: {
		opacity: 0,
		y: -6,
		transition: {
			ease: "easeOut",
		},
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			ease: "easeOut",
		},
	},
};

export const dropdown: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.96,
		transition: {
			duration: 0.15,
			ease: "easeOut",
		},
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.15,
			ease: "easeOut",
		},
	},
};
