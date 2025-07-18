"use client";

import { ITEM_SLICE_INDEX } from "@/lib/constants";
import { EXPERIENCES } from "@/lib/data";
import { useMemo, useState } from "react";
import Expander from "../animation/expander";
import Button from "../button";
import Section from "../section";
import Experience from "./experience";

const ExperienceSection = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const sortedExperiences = useMemo(
		() =>
			EXPERIENCES.toSorted((a, b) => {
				if (a.startDate > b.startDate) return -1;
				if (a.startDate < b.startDate) return 1;
				return 0;
			}),
		[]
	);

	return (
		<Section title="Experience" id="experience">
			<ul className="space-y-8">
				{sortedExperiences.slice(0, ITEM_SLICE_INDEX).map((experience, i) => (
					<Experience key={experience.id} index={i} {...experience} />
				))}
			</ul>
			<Expander expanded={isExpanded}>
				<ul className="space-y-8 mt-8">
					{sortedExperiences.slice(ITEM_SLICE_INDEX).map((experience, i) => (
						<Experience
							key={experience.id}
							index={i + ITEM_SLICE_INDEX}
							{...experience}
						/>
					))}
				</ul>
			</Expander>
			{sortedExperiences.length > ITEM_SLICE_INDEX && (
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

export default ExperienceSection;
