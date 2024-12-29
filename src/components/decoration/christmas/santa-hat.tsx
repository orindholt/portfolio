"use client";

import {
	Decorations,
	useDecoration,
} from "@/components/providers/decoration-provider";

const SantaHat = (props: React.SVGProps<SVGSVGElement>) => {
	const { decorations } = useDecoration();
	const isActive = decorations.includes(Decorations.Snow);

	if (!isActive) return null;

	return (
		<svg
			width={50}
			height={50}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 511.861 511.861"
			xmlSpace="preserve"
			{...props}
		>
			<path
				style={{
					fill: "#e14b4b",
				}}
				d="M53.86 253.519s26.064-101.856 130.336-144.528c0 0 41.072-59.248 169.04-22.912 0 0 37.92 25.28 44.24 39.488 0 0 56.08 9.488 56.08 74.256 0 0 11.056 16.592 7.904 57.664l8.688 87.68-41.872 32.384-2.368-15.792s-40.288-60.832-42.656-79.776c0 0-11.056-8.688-11.056 12.64l11.056 33.168-307.28-23.808z"
			/>
			<path
				style={{
					fill: "#d03f3e",
				}}
				d="M399.636 206.895c-9.008-39.904-22.176-78.864-39.44-116.032 8.064 5.776 21.424 15.824 29.952 24.832 5.792 30.048 8.912 60.576 9.488 91.2m-116.32-87.408c3.504-.192 6.544 1.232 9.2 3.504-3.024-1.232-6.16-2.368-9.2-3.504m99.824 162.384c-1.136-.768-10.8-7.296-10.896 12.512-4.272-5.68-7.872-12.128-11.952-17.92-11.376-16.304-27.872-28.336-43.984-40.096-30.816-22.464-62.56-45.312-99.152-56.112 18.016-.944 35.552 5.504 52.32 12.032 33.184 12.896 67.392 27.776 89.296 55.744-.096-18.768-10.144-35.84-19.904-51.856-12.8-21.04-25.6-42.096-38.4-63.136-2.176-3.6-4.832-7.488-7.968-10.048 14.224 5.408 27.968 12.032 38.672 22.656 14.224 14.128 21.328 33.648 27.584 52.704a1323 1323 0 0 1 24.384 83.52"
			/>
			<path
				style={{
					fill: "#dae5ef",
				}}
				d="M.34 359.407c0-12.336-.112 1.824-.224-3.344-.448 13.872-.16-62.56 11.648-70.624 8.448-8.496 16.176-34.256 22.944-24.384 5.776-4.816 9.808 2.288 13.056-6.208 3.248-1.696 5.712-9.36 8.336-1.2 2.624-1.888 5.424 5.52 9.344 3.248 3.92 5.856 8.944 2.272 16.064 7.12 0 5.552 2.64-6.672 6.624-.768 4 5.088 9.344 1.056 14.784-2.224 5.44-5.696 10.976-8.912 15.312-3.536 3.264 3.824 7.808 4.784 12.816-.816 4.992-4.64 10.448-2.992 15.472 2.224 5.04 7.008 9.664 7.536 13.04 3.008 3.376 4.96 5.472-1.616 5.472 1.504 0 .224 1.28 4.768 3.584-.144 2.304-1.264 5.6 2.576 9.648-.224 4.048 5.84 8.832-1.04 14.064.016 5.248-5.312 10.944-9.6 16.832.56 5.888-4.416 11.952-2.976 17.936 1.424 5.984-1.904 11.872-.496 17.408 2.608 5.52-1.264 10.688 7.808 15.2 4.08 4.528-4.416 8.4-8.304 11.36 5.888 0-2.944 1.392 4.064 3.888.928 2.496 1.568 6.08-1.52 10.464 2.608 4.384-.336 9.552 2 15.232 4.016 5.664-6.08 11.824 4.032 18.176 5.184 6.352 3.248 12.896 11.072 19.312 6.064 6.432-6.256 12.736 3.056 18.64 6.688 5.904 11.312 11.392 2.56 16.16 7.056 4.768 2.352 8.832.784 11.856 7.152 0 .144 2.576 8.416 3.024 8.816.832 1.28 1.744 11.008 2.624 10.304 3.568 9.616 5.648 52.752-.304 69.744 0-.048-.704-2.976-2.144 2.496-1.44.992-3.616-2.208-6.528 5.296-2.912 4.08-6.592 1.728-11.024 4.752-4.432 7.472-9.648 4.192-15.632.88-5.984-3.344-12.768-5.952-20.352-6.32 0-7.568-.448-2.336-1.312-.448-.864 3.968-2.16-3.792-3.856-1.248-1.696-9.664-3.792 1.072-6.256-1.92-2.48-2.64-5.328.112-8.544-2.432-3.216 7.92-6.784-3.184-10.688-2.816-3.904-5.696-8.16-10.208-12.72-3.072-4.56.784-9.44-8.992-14.608-3.168-5.168-5.2-10.64 5.248-16.384-3.136-5.744 2.32-11.76-4.624-18.016-2.96-6.272-2.4-12.784 1.328-19.536-2.64-6.752.48-13.728 1.776-20.912-2.192-7.184-.848-14.592-5.84-22.176-1.584-7.584-3.136-15.36-.864-23.296-.848-7.936-2.8-16.048-1.008-24.304.016-14.416-3.632-27.072-.896-38.16.208-11.088 1.248-20.608-.992-28.784-1.088-8.176-1.968-15.008-2.8-20.72-1.952-5.712 6.8-10.304-2.944-13.984-2.432-3.68-1.056-6.464-7.216-8.56-2.544-2.096-.208-3.52-6.016-4.48-2.288-.96-1.12-1.456.88-1.712-1.648-.256 3.28-.272 7.824-.272-.64 0 10.048-2.816 2.304-6.064-2.736-3.28.672-6.992 5.952-8.768-10.304m505.136.256c14.112 22.32 3.504 56.384-18.816 70.496s-51.856 7.44-65.968-14.88-7.44-51.856 14.88-65.968c22.304-14.112 55.792-11.984 69.904 10.352"
			/>
			<path
				style={{
					fill: "#cbd6e0",
				}}
				d="M503.716 411.695c-4.16 7.52-10.08 13.92-17.12 18.4-22.24 14.24-51.84 7.52-65.92-14.88-14.08-22.24-7.52-51.84 14.88-65.92 1.12-.64 2.08-1.28 3.2-1.76-7.68 14.56-7.52 32.8 1.92 47.68 13.44 21.44 41.28 28.48 63.04 16.48m-62.768-63.184c.192-.64.096-1.296-.112-1.92-.08.032-.144.08-.224.112z"
			/>
		</svg>
	);
};

export default SantaHat;
