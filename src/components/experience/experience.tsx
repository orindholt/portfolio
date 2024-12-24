import { Experience as ExperienceProps } from "@/lib/types/content-types";
import { DynamicElement } from "@/lib/types/shared-types";
import Card from "../card";

const Experience = <T extends React.ElementType>({
	company,
	companyLink,
	description,
	endDate,
	startDate,
	title,
	...props
}: Omit<DynamicElement<T>, "as"> & ExperienceProps) => {
	const formatter = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
	});

	const formattedStartDate = startDate ? formatter.format(startDate) : null;
	const formattedEndDate = endDate ? formatter.format(endDate) : "Present";

	return (
		<Card {...props}>
			<h3 className="font-semibold normal-case text-base flex sm:items-center gap-x-2 flex-wrap max-sm:flex-col">
				<span>{title}</span>{" "}
				<span className="text-gray-500 max-sm:hidden">•</span>{" "}
				<a
					target="_blank"
					href={companyLink}
					className="font-normal text-primary-500 lg:hover:underline relative inline-block"
				>
					{company}
				</a>
			</h3>
			<p className="text-sm text-gray-300">{description}</p>
			<p className="font-medium text-sm text-primary-500">
				{formattedStartDate} - {formattedEndDate}
			</p>
		</Card>
	);
};

export default Experience;
