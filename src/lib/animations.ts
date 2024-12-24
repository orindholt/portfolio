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
