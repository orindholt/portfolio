import { cn } from "@/lib/utils";

const Container = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn("max-w-screen-md w-full mx-auto px-8", className)}
			{...props}
		>
			{children}
		</div>
	);
};

export default Container;
