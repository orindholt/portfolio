"use client";

import { motion, useScroll, useSpring } from "motion/react";

const ScrollProgress = () => {
	const { scrollYProgress } = useScroll();
	const smoothProgress = useSpring(scrollYProgress, {
		mass: 0.1,
		bounce: 1,
		stiffness: 50,
	});

	return (
		<motion.div
			className="h-1 bg-gradient-to-r from-primary-600 to-primary-500 bg-fixed fixed top-0 inset-x-0 z-50 origin-left"
			style={{
				scaleX: smoothProgress,
				filter: "drop-shadow(0 0 0.5rem hsla(var(--primary-500), 0.5))",
			}}
		/>
	);
};

export default ScrollProgress;
