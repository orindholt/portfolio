"use client";

import { SKILLS } from "@/lib/constants";
import { cn, hexToHSL } from "@/lib/utils";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

const SkillSlider = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const containerRef = useRef<HTMLDivElement>(null);
	const sliderRef = useRef<SwiperRef>(null);

	const isInView = useInView(containerRef);

	useEffect(() => {
		const swiper = sliderRef.current?.swiper;

		if (isInView) {
			swiper?.autoplay?.start();
		} else {
			swiper?.autoplay?.stop();
		}

		return () => {
			swiper?.autoplay?.stop();
		};
	}, [isInView]);

	return (
		<div
			ref={containerRef}
			className={cn("w-full fade-out-x", className)}
			{...props}
		>
			<Swiper
				autoplay={{
					delay: 3000,
				}}
				ref={sliderRef}
				loop
				grabCursor
				centeredSlides
				onSlideChange={({ realIndex }) => setCurrentSlide(realIndex)}
				breakpoints={{
					0: {
						slidesPerView: 3,
					},
					420: {
						slidesPerView: 5,
					},
					640: {
						slidesPerView: 7,
					},
					1024: {
						slidesPerView: 8.5,
					},
				}}
				modules={[Autoplay]}
			>
				{Object.values(SKILLS).map((skill, i) => {
					const isActive = i === currentSlide;
					const hsl = hexToHSL(skill.color);
					return (
						<SwiperSlide
							className="flex justify-center gap-2 h-28 pt-8 relative"
							key={skill.name}
						>
							<svg
								className={cn(
									"transition-all duration-300 will-change-transform drop-shadow-md",
									isActive
										? "size-14 fill-[hsla(var(--skill-color))] -mt-2.5"
										: "size-10 fill-white"
								)}
								style={
									{
										"--skill-color": `${hsl.h}, ${hsl.s}%, ${hsl.l}%`,
										filter: isActive
											? "drop-shadow(0 0 0.5rem hsla(var(--skill-color), 0.2))"
											: "none",
									} as React.CSSProperties
								}
								viewBox={skill.svg.viewBox}
							>
								<path d={skill.svg.path} />
							</svg>
							<span
								className="absolute bottom-0 transition-all duration-300 ease-in-out w-max font-medium"
								style={{
									opacity: isActive ? 1 : 0,
									transform: `scale(${isActive ? 1 : 0.8})`,
									visibility: isActive ? "visible" : "hidden",
								}}
							>
								{skill.name}
							</span>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default SkillSlider;
