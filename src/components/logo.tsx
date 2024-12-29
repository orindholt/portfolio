const Logo = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width={100}
			height={100}
			viewBox="0 0 200 200"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M80.4349 12C78.778 12 77.4349 13.3431 77.4349 15V54.429C77.4349 56.7372 74.9372 58.1807 72.9372 57.0284L38.6755 37.2886C37.2419 36.4626 35.4101 36.9533 34.5813 38.3853L14.5057 73.0726C13.6746 74.5086 14.1669 76.3465 15.6045 77.1748L49.839 96.8988C51.8428 98.0533 51.8419 100.945 49.8374 102.099L15.6069 121.794C14.1682 122.622 13.6751 124.46 14.5066 125.897L34.5814 160.583C35.4101 162.015 37.2419 162.505 38.6755 161.679L72.9372 141.94C74.9372 140.787 77.4349 142.231 77.4349 144.539V184C77.4349 185.657 78.778 187 80.4349 187H120.597C122.254 187 123.597 185.657 123.597 184V144.57C123.597 142.262 126.094 140.818 128.094 141.97L162.325 161.68C163.758 162.506 165.59 162.015 166.418 160.583L186.493 125.897C187.325 124.46 186.832 122.622 185.393 121.794L151.163 102.099C149.158 100.945 149.157 98.0533 151.161 96.8988L185.395 77.1748C186.833 76.3465 187.325 74.5086 186.494 73.0726L166.418 38.3846C165.59 36.9529 163.758 36.4621 162.325 37.2876L128.094 56.9982C126.094 58.1499 123.597 56.7063 123.597 54.3985V15C123.597 13.3431 122.254 12 120.597 12H80.4349Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export default Logo;