import { cn } from "@/lib/utils";
import Heading from "./heading";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
}

const Section = ({ className, children, title, ...props }: SectionProps) => {
	return (
		<section
			className={cn("w-full text-center flex flex-col py-8", className)}
			{...props}
		>
			{title && <Heading className="mb-8">{title}</Heading>}
			{children}
		</section>
	);
};

export default Section;
