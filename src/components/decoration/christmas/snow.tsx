"use client";

import {
	Decorations,
	useDecoration,
} from "@/components/providers/decoration-provider";
import { Theme, useTheme } from "@/components/providers/theme-provider";
import { cn, randomInRange } from "@/lib/utils";
import confetti, { CreateTypes } from "canvas-confetti";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface SnowProps {
	durationInSec?: number;
	skew?: number;
}

type HTMLCanvasElementWithConfetti = HTMLCanvasElement & {
	confetti?: CreateTypes;
};

const Snow = ({
	durationInSec = Infinity,
	skew: initialSkew = 1,
}: SnowProps) => {
	const [mounted, setMounted] = useState(false);

	const initialRender = useRef(true);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const { hasDecoration } = useDecoration();
	const { theme } = useTheme();

	const isActive = hasDecoration(Decorations.Snow);

	const themeRef = useRef(theme);

	useEffect(() => {
		themeRef.current = theme;
	}, [theme]);

	useEffect(() => {
		const canvas = canvasRef.current as HTMLCanvasElementWithConfetti;
		setMounted(true);

		if (mounted && canvas && initialRender.current && isActive) {
			initialRender.current = false;

			canvas.confetti =
				canvas.confetti ??
				confetti.create(canvas, {
					resize: true,
				});

			const duration = durationInSec * 1000;
			const animationEnd = Date.now() + duration;

			(function frame() {
				const timeLeft = animationEnd - Date.now();
				const ticks =
					durationInSec === Infinity
						? Infinity
						: Math.max(200, 500 * (timeLeft / duration));
				const skew = Math.max(0.8, initialSkew - 0.001);

				canvas.confetti({
					particleCount: 1,
					startVelocity: 0,
					ticks,
					origin: {
						x: Math.random(),
						y: Math.random() * skew - 0.2,
					},
					colors: [themeRef.current === Theme.Light ? "#334155" : "#ffffff"],
					shapes: ["circle"],
					gravity: randomInRange(0.4, 0.6),
					scalar: randomInRange(0.2, 0.8),
					drift: randomInRange(-0.4, 0.4),
				});

				if (durationInSec === Infinity || timeLeft > 0) {
					requestAnimationFrame(frame);
				}
			})();
		}
	}, [mounted, durationInSec, isActive, initialSkew]);

	if (!mounted) return null;

	const root = document.getElementById("root") || document.body;

	return createPortal(
		<canvas
			aria-hidden
			ref={canvasRef}
			className={cn(
				"fixed inset-0 z-40 size-full pointer-events-none",
				theme === Theme.Light ? "opacity-30" : "opacity-10"
			)}
			style={{
				display: isActive ? "block" : "none",
			}}
		/>,
		root
	);
};

export default Snow;
