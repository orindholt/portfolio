import { cn } from "@/lib/utils";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import { AutoplayOptions } from "swiper/types";

export interface CarouselProps<T = unknown>
	extends Omit<SwiperProps, "children" | "className">,
		Pick<React.HTMLAttributes<HTMLDivElement>, "className"> {
	items: Array<T>;
	fadeOut?: boolean;
	autoplay?: boolean;
	autoplayOptions?: AutoplayOptions;
	onlyAutoplayInViewport?: boolean;
	children: (
		item: T,
		props: { isActive: boolean; currentSlide: number; slideIndex: number }
	) => React.ReactNode;
}

const Carousel = <T extends unknown>({
	className,
	fadeOut = true,
	items = [],
	autoplay = false,
	autoplayOptions = {},
	onlyAutoplayInViewport = true,
	children,
	...props
}: CarouselProps<T>) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const containerRef = useRef<HTMLDivElement>(null);
	const sliderRef = useRef<SwiperRef>(null);

	const isInView = useInView(containerRef);

	useEffect(() => {
		const swiper = sliderRef.current?.swiper;

		if (autoplay && onlyAutoplayInViewport) {
			if (isInView) {
				swiper?.autoplay?.start();
			} else {
				swiper?.autoplay?.stop();
			}
		}

		return () => {
			swiper?.autoplay?.stop();
		};
	}, [autoplay, onlyAutoplayInViewport, isInView]);

	return (
		<div
			ref={containerRef}
			className={cn("w-full", fadeOut && "fade-out-x", className)}
		>
			<Swiper
				autoplay={{
					delay: 3000,
					...autoplayOptions,
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
				modules={autoplay ? [Autoplay] : undefined}
				{...props}
			>
				{items.map((item, i) => {
					const isActive = i === currentSlide;
					return (
						<SwiperSlide
							className="flex justify-center gap-2 h-28 pt-8 relative"
							key={`Slide ${i + 1}`}
						>
							{children(item, { isActive, currentSlide, slideIndex: i })}
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default Carousel;
