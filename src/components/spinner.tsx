const Spinner = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width={24}
			height={24}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			{...props}
		>
			<g>
				<path opacity={0.14} d="M11 1h2v5h-2z" />
				<path opacity={0.29} d="m16.634 1.974 1.732 1-2.5 4.33-1.732-1z" />
				<path opacity={0.43} d="m21.026 5.634 1 1.732-4.33 2.5-1-1.732z" />
				<path opacity={0.57} d="M23 11v2h-5v-2z" />
				<path opacity={0.71} d="m22.026 16.634-1 1.732-4.33-2.5 1-1.732z" />
				<path opacity={0.86} d="m18.366 21.026-1.732 1-2.5-4.33 1.732-1z" />
				<path d="M13 23h-2v-5h2z" />
				<animateTransform
					attributeName="transform"
					type="rotate"
					calcMode="discrete"
					dur="0.75s"
					values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
					repeatCount="indefinite"
				/>
			</g>
		</svg>
	);
};

export default Spinner;
