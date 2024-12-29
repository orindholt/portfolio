import { cn } from "@/lib/utils";

const Button = ({
	className,
	type = "button",
	children,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			type={type}
			className={cn(
				"bg-gradient-to-br from-primary-600 to-primary-700 active:scale-95 transition-all rounded px-[1em] h-12",
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
