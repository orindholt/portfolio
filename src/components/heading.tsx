import { cn } from "@/lib/utils";

const Heading = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
	return (
		<h2
			className={cn(
				"text-xl text-center text-primary-500 font-light leading-tight",
				className
			)}
			{...props}
		>
			{children}
		</h2>
	);
};

export default Heading;
