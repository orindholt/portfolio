"use client";

import { SKILLS } from "@/lib/data";
import { cn, hexToHSL } from "@/lib/utils";
import { Fragment } from "react";
import Carousel, { CarouselProps } from "../carousel";

const skillArray = Object.values(SKILLS);

const SkillSlider = (props: Omit<CarouselProps, "children" | "items">) => {
	return (
		<Carousel
			items={skillArray}
			autoplay
			autoplayOptions={{
				delay: 3500,
			}}
			onlyAutoplayInViewport
			fadeOut
			{...props}
		>
			{(item, { isActive }) => {
				const hsl = hexToHSL(item.color);
				return (
					<Fragment key={item.name}>
						<svg
							className={cn(
								"transition-all duration-300 will-change-transform",
								isActive
									? "size-14 fill-[hsla(var(--skill-color))] -mt-2.5 animate-shadow-pulse"
									: "size-10 fill-white"
							)}
							style={
								{
									"--skill-color": `${hsl.h}, ${hsl.s}%, ${hsl.l}%`,
								} as React.CSSProperties
							}
							viewBox={item.svg.viewBox}
						>
							<path d={item.svg.path} />
						</svg>
						<span
							className="absolute bottom-0 transition-all duration-300 ease-in-out w-max font-medium"
							style={{
								opacity: isActive ? 1 : 0,
								transform: `scale(${isActive ? 1 : 0.8})`,
								visibility: isActive ? "visible" : "hidden",
							}}
						>
							{item.name}
						</span>
					</Fragment>
				);
			}}
		</Carousel>
	);
};

export default SkillSlider;
