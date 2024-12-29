"use client";

import {
	Decorations,
	useDecoration,
} from "@/components/providers/decoration-provider";
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

	const { decorations } = useDecoration();

	const isActive = decorations.includes(Decorations.Snow);

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
					colors: ["#ffffff"],
					shapes: ["circle"],
					gravity: randomInRange(0.4, 0.6),
					scalar: randomInRange(0.4, 1),
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
			className="fixed inset-0 z-40 size-full opacity-10 pointer-events-none"
			style={{
				display: isActive ? "block" : "none",
			}}
		/>,
		root
	);
};

function randomInRange(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

export default Snow;
