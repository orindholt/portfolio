import { DynamicElement } from "@/lib/types/shared-types";
import { cn } from "@/lib/utils";

const Card = <T extends React.ElementType = "div">({
	className,
	children,
	as,
	...props
}: DynamicElement<T>) => {
	const Element = as || "div";
	return (
		<Element
			className={cn(
				"bg-gradient-to-br from-gray-950 to-gray-900 border border-gray-800 text-white rounded-xl p-6 card flex flex-col gap-4 text-left",
				className
			)}
			{...props}
		>
			{children}
		</Element>
	);
};

export default Card;
