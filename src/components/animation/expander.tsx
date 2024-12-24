import {
	AnimatePresence,
	HTMLMotionProps,
	motion,
	Variants,
} from "motion/react";

interface ExpanderProps extends HTMLMotionProps<"div"> {
	expanded: boolean;
}

const variants: Variants = {
	hidden: { height: 0, opacity: 0, overflow: "hidden" },
	visible: { height: "auto", opacity: 1, overflow: "visible" },
};

const Expander = ({
	expanded,
	children,
	className,
	...props
}: ExpanderProps) => {
	return (
		<AnimatePresence>
			{expanded && (
				<motion.div
					className={className}
					variants={variants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					{...props}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Expander;
