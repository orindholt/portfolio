"use client";

import { ITEM_SLICE_INDEX, PROJECTS } from "@/lib/constants";
import { useMemo, useState } from "react";
import Expander from "../animation/expander";
import Button from "../button";
import Heading from "../heading";
import Project from "./project";

const ProjectSection = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const sorted = useMemo(
		() =>
			PROJECTS.toSorted((a, b) => {
				if (!a.startDate || !b.startDate) return 1;
				if (a.startDate > b.startDate) return -1;
				if (a.startDate < b.startDate) return 1;
				return 0;
			}),
		[]
	);

	return (
		<section className="flex flex-col py-8">
			<Heading className="mb-8">Projects</Heading>
			<ul className="space-y-8">
				{sorted.slice(0, ITEM_SLICE_INDEX).map(project => (
					<Project as="li" key={project.title} {...project} />
				))}
			</ul>
			<Expander expanded={isExpanded}>
				<ul className="space-y-8 mt-8">
					{sorted.slice(ITEM_SLICE_INDEX).map(project => (
						<Project key={project.title} {...project} />
					))}
				</ul>
			</Expander>
			{sorted.length > ITEM_SLICE_INDEX && (
				<Button
					className="mx-auto mt-8"
					onClick={() => setIsExpanded(prev => !prev)}
				>
					{isExpanded ? "Contract" : "Expand"}
				</Button>
			)}
		</section>
	);
};

export default ProjectSection;
