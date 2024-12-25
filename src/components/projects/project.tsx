import { Project as ProjectProps } from "@/lib/types/content-types";
import { DynamicElement } from "@/lib/types/shared-types";
import { Github, SquareArrowOutUpRight } from "lucide-react";
import Card from "../card";
import Tooltip from "../tooltip";

const Project = <T extends React.ElementType>({
	description,
	slug,
	tags,
	title,
	link,
	repo,
	startDate,
	...props
}: Omit<DynamicElement<T>, "as"> & ProjectProps) => {
	const formattedDate = startDate?.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
	});

	return (
		<Card data-slug={slug} {...props}>
			<div className="flex items-center justify-between gap-3 flex-wrap">
				<h3 className="font-bold text-lg leading-none normal-case">{title}</h3>{" "}
				<ul className="flex flex-wrap gap-2">
					{tags.map(
						({ name, color, svg }) =>
							name && (
								<Tooltip text={name} key={name}>
									<svg
										className="fill-white lg:hover:fill-[var(--skill-color)] size-6"
										style={
											{
												"--skill-color": color,
											} as React.CSSProperties
										}
										viewBox={svg.viewBox}
									>
										{(Array.isArray(svg.path) ? svg.path : [svg.path]).map(
											(path, i) => (
												<path key={i} d={path} />
											)
										)}
									</svg>
								</Tooltip>
							)
					)}
				</ul>
			</div>
			<p className="text-gray-300 text-sm">{description}</p>
			<div className="flex mt-auto gap-4">
				<p className="font-medium text-sm text-primary-500">
					Started: {formattedDate}
				</p>
				<div className="flex gap-2 ml-auto">
					{repo && (
						<a
							aria-label="Repository link"
							href={repo}
							target="_blank"
							className="text-gray-300 lg:hover:text-primary-500"
						>
							<Github />
						</a>
					)}
					{link && (
						<a
							aria-label="Project link"
							href={link}
							target="_blank"
							className="text-gray-300 lg:hover:text-primary-500"
						>
							<SquareArrowOutUpRight />
						</a>
					)}
				</div>
			</div>
		</Card>
	);
};

export default Project;
