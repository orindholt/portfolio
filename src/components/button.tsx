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
				"bg-primary-600 border-primary-600 lg:hover:bg-transparent lg:hover:text-primary-600 border-2 active:scale-95 transition-all rounded px-[1em] h-12",
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
