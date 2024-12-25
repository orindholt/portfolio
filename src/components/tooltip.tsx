"use client";

import { tooltip } from "@/lib/animations";
import { DynamicElement } from "@/lib/types/shared-types";
import { AnimatePresence, motion } from "motion/react";
import { Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type TooltipProps<T extends React.ElementType> = DynamicElement<T> & {
	text: string;
};

const Tooltip = <T extends React.ElementType = "div">({
	children,
	as,
	text,
	...props
}: TooltipProps<T>) => {
	const [coords, setCoords] = useState({ x: 0, y: 0 });
	const [hovered, setHovered] = useState(false);
	const [mounted, setMounted] = useState(false);

	const Element = as || "div";

	function handleMouseOver(e: React.MouseEvent<HTMLDivElement>) {
		const element = e.currentTarget as HTMLElement;
		const rect = element.getBoundingClientRect();
		const x = rect.left + rect.width / 2 + window.scrollX;
		const y = rect.top - rect.height * 2 + window.scrollY;

		setCoords({
			x,
			y,
		});
		setHovered(true);
	}
	function handleMouseOut() {
		setHovered(false);
	}

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const root = document.getElementById("root") || document.body;

	return (
		<Fragment>
			<Element
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				{...props}
			>
				{children}
			</Element>
			{createPortal(
				<AnimatePresence>
					{hovered && (
						<motion.aside
							className="absolute w-max pointer-events-none"
							style={{
								left: coords.x,
								top: coords.y,
							}}
							variants={tooltip}
							initial="hidden"
							animate="visible"
							exit="hidden"
						>
							<div className="-translate-x-1/2 -mt-1.5">
								<div className="bg-background p-2 rounded-md">{text}</div>
								<svg
									className="fill-background relative -top-px mx-auto rotate-180"
									width="20"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 25.99 14.6"
								>
									<path d="m10.78,1.01L.82,15.42l22.36-.04L13.25,1.01c-.5-.72-1.97-.72-2.47,0Z" />
									<path d="m13.99.99c-.43-.62-1.18-.99-2.01-.99s-1.58.37-2.01.99L0,15.42h1.22S10.8,1.56,10.8,1.56c.48-.69,1.89-.69,2.37,0l9.56,13.82h1.21S13.99.99,13.99.99Z" />
								</svg>
							</div>
						</motion.aside>
					)}
				</AnimatePresence>,
				root
			)}
		</Fragment>
	);
};

export default Tooltip;
