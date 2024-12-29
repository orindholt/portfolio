import {
	AnimatePresence,
	HTMLMotionProps,
	motion,
	Variants,
} from "motion/react";

type ExpanderProps<T extends keyof React.ReactHTML = "div"> =
	HTMLMotionProps<T> & {
		expanded: boolean;
		as?: T;
	};

const variants: Variants = {
	hidden: { height: 0, opacity: 0, overflow: "hidden" },
	visible: { height: "auto", opacity: 1, overflow: "visible" },
};

const Expander = ({
	expanded,
	children,
	className,
	as = "div",
	...props
}: ExpanderProps) => {
	const Element = motion.create(as);
	return (
		<AnimatePresence>
			{expanded && (
				<Element
					className={className}
					variants={variants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					{...props}
				>
					{children}
				</Element>
			)}
		</AnimatePresence>
	);
};

export default Expander;
