"use client";

import { ITEM_SLICE_INDEX } from "@/lib/constants";
import { PROJECTS } from "@/lib/data";
import { useMemo, useState } from "react";
import Expander from "../animation/expander";
import Button from "../button";
import Section from "../section";
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
		<Section title="Projects" id="projects">
			<ul className="space-y-8">
				{sorted.slice(0, ITEM_SLICE_INDEX).map((project, i) => (
					<Project as="li" key={project.title} index={i} {...project} />
				))}
			</ul>
			<Expander expanded={isExpanded}>
				<ul className="space-y-8 mt-8">
					{sorted.slice(ITEM_SLICE_INDEX).map((project, i) => (
						<Project
							key={project.title}
							index={i + ITEM_SLICE_INDEX}
							{...project}
						/>
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
		</Section>
	);
};

export default ProjectSection;
