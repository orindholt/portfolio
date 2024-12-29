import { cn } from "@/lib/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLElement> {
	htmlFor?: string;
}

const Label = ({ children, className, htmlFor, ...props }: LabelProps) => {
	const Component = htmlFor ? "label" : "div";
	return (
		<Component className={cn("font-medium text-base", className)} {...props}>
			{children}
		</Component>
	);
};

export default Label;
