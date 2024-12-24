"use client";

import { PROJECTS } from "@/lib/constants";
import { useState } from "react";
import Expander from "../animation/expander";
import Button from "../button";
import Heading from "../heading";
import Project from "./project";

const SLICE_INDEX = 3;

const ProjectSection = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const sorted = PROJECTS.toSorted((a, b) => {
		if (!a.startDate || !b.startDate) return 1;
		if (a.startDate > b.startDate) return -1;
		if (a.startDate < b.startDate) return 1;
		return 0;
	});

	return (
		<section className="flex flex-col gap-8 py-8">
			<Heading>Projects</Heading>
			<ul className="space-y-8">
				{sorted.slice(0, SLICE_INDEX).map(project => (
					<Project key={project.title} {...project} />
				))}
				<Expander className="space-y-8" expanded={isExpanded}>
					{sorted.slice(SLICE_INDEX).map(project => (
						<Project key={project.title} {...project} />
					))}
				</Expander>
			</ul>
			<Button className="mx-auto" onClick={() => setIsExpanded(prev => !prev)}>
				{isExpanded ? "Contract" : "Expand"}
			</Button>
		</section>
	);
};

export default ProjectSection;
