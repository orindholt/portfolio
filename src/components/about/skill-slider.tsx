"use client";

import { SKILLS } from "@/lib/data";
import { cn, getSkillColor } from "@/lib/utils";
import Carousel, { CarouselProps } from "../carousel";

const skillArray = Object.values(SKILLS);

const SkillSlider = ({
	className,
	...props
}: Omit<CarouselProps, "children" | "items">) => {
	return (
		<Carousel
			className={cn("h-32", className)}
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
				return (
					<div className="relative w-fit mx-auto select-none" key={item.name}>
						<svg
							className={cn(
								"transition-all duration-300 will-change-transform",
								isActive
									? "size-14 fill-[hsla(var(--skill-color))] -mt-2.5 animate-shadow-pulse"
									: "size-10 fill-foreground",
							)}
							style={
								{
									"--skill-color": getSkillColor(item.color),
								} as React.CSSProperties
							}
							viewBox={item.svg.viewBox}
						>
							<path d={item.svg.path} />
						</svg>
						<span
							className="absolute -bottom-1 left-1/2 translate-y-full -translate-x-1/2 transition-all duration-300 ease-in-out w-max font-medium pointer-events-none"
							style={{
								opacity: isActive ? 1 : 0,
								transform: `scale(${isActive ? 1 : 0.8})`,
								visibility: isActive ? "visible" : "hidden",
							}}
						>
							{item.name}
						</span>
					</div>
				);
			}}
		</Carousel>
	);
};

export default SkillSlider;
