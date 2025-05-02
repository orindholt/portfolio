import { cn } from "@/lib/utils";
import SocialList from "../social-list";

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
			<div className="space-y-4">
				<h2 className="text-xl sm:text-2xl font-extralight text-primary-400">
					Fullstack Web Developer
				</h2>
				<h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold uppercase gap-6 !leading-none">
					Oliver Rindholt
				</h1>
			</div>
			{/* <Contributions /> */}
			<SocialList />
		</div>
	);
};

export default IntroSection;
