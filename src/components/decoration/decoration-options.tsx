import { cn } from "@/lib/utils";
import { SnowflakeIcon } from "lucide-react";
import { Decorations, useDecoration } from "../providers/decoration-provider";

const DecorationOptions = () => {
	return (
		<div className="fixed top-4 right-4">
			<DecorationButton decoration={Decorations.Snow}>
				<SnowflakeIcon />
			</DecorationButton>
		</div>
	);
};

function DecorationButton({
	className,
	children,
	decoration,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
	decoration: Decorations;
}) {
	const { decorations, setDecorations } = useDecoration();

	function toggleDecoration(decoration: Decorations) {
		setDecorations(decorations =>
			decorations.includes(decoration)
				? decorations.filter(d => d !== decoration)
				: [...decorations, decoration]
		);
	}

	const isActive = decorations.includes(decoration);

	return (
		<button
			onClick={() => toggleDecoration(decoration)}
			type="button"
			className={cn(
				"size-8 p-1.5 rounded-full border border-white flex items-center justify-center transition-colors",
				isActive ? "bg-white text-black" : "text-white",
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}

export default DecorationOptions;
