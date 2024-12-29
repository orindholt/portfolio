"use client";

import { cn } from "@/lib/utils";
import Spinner from "./spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
}

const Button = ({
	className,
	type = "button",
	children,
	loading = false,
	disabled = false,
	...props
}: ButtonProps) => {
	return (
		<button
			disabled={disabled || loading}
			aria-busy={loading}
			type={type}
			className={cn(
				"bg-gradient-to-br from-primary-600 to-primary-700 active:scale-95 transition-all rounded px-[1em] h-12 relative",
				loading && "cursor-wait",
				disabled && "cursor-not-allowed opacity-50",
				className
			)}
			{...props}
		>
			{loading && <Spinner className="absolute inset-0 m-auto size-7" />}
			<span
				style={{
					visibility: loading ? "hidden" : "visible",
				}}
			>
				{children}
			</span>
		</button>
	);
};

export default Button;
