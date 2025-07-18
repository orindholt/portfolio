import { Experience as ExperienceProps } from "@/lib/types/content-types";
import { DynamicElement } from "@/lib/types/shared-types";
import { cn } from "@/lib/utils";
import Card from "../card";
import SantaHat from "../decoration/christmas/santa-hat";

function getYearsDifference(startDate: Date, endDate: Date) {
	// Convert to Date objects if they're strings
	const start = new Date(startDate);
	const end = new Date(endDate);

	// Validate dates
	if (isNaN(start.getTime()) || isNaN(end.getTime())) {
		throw new Error("Invalid date provided");
	}

	// Calculate the difference in milliseconds
	const diffInMs = end.getTime() - start.getTime();

	// Convert to years (365.25 days per year accounts for leap years)
	const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
	const yearsDifference = diffInMs / msPerYear;

	return yearsDifference.toFixed(1);
}

const formatter = new Intl.DateTimeFormat("en-US", {
	year: "numeric",
	month: "short",
});

const Experience = <T extends React.ElementType>({
	company,
	companyLink,
	description,
	endDate,
	startDate,
	title,
	index,
	...props
}: Omit<DynamicElement<T>, "as"> &
	ExperienceProps & {
		index: number;
	}) => {
	const formattedStartDate = startDate ? formatter.format(startDate) : null;
	const formattedEndDate = endDate ? formatter.format(endDate) : "Present";

	const formattedDuration = startDate
		? getYearsDifference(startDate, endDate || new Date())
		: null;

	return (
		<Card as="li" {...props}>
			<SantaHat
				className={cn(
					"absolute -top-1.5 -translate-y-1/2",
					index % 2 === 0
						? "-right-5 rotate-12"
						: "-left-5 -rotate-12 scale-x-[-1]"
				)}
			/>
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
				{formattedStartDate} - {formattedEndDate}{" "}
				{formattedDuration && (
					<span className="font-light">(~{formattedDuration} years)</span>
				)}
			</p>
		</Card>
	);
};

export default Experience;
