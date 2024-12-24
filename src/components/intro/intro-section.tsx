import { cn } from "@/lib/utils";
import Contributions from "../github/contributions";

const IntroSection = ({
	className,
	...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "children">) => {
	return (
		<div
			className={cn(
				"flex flex-col gap-8 justify-center items-center text-center",
				className
			)}
			{...props}
		>
			<div>
				<h2 className="text-xl sm:text-2xl font-extralight text-primary-400">
					Fullstack Web Developer
				</h2>
				<h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold uppercase gap-6 !leading-none">
					Oliver Rindholt
				</h1>
			</div>
			<Contributions />
		</div>
	);
};

export default IntroSection;
