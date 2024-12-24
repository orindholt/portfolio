"use client";

import { EXPERIENCE } from "@/lib/constants";
import { useState } from "react";
import Expander from "../animation/expander";
import Button from "../button";
import Heading from "../heading";
import Experience from "./experience";

const SLICE_INDEX = 3;

const ExperienceSection = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const sorted = EXPERIENCE.toSorted((a, b) => {
		if (a.startDate > b.startDate) return -1;
		if (a.startDate < b.startDate) return 1;
		return 0;
	});

	return (
		<section className="flex flex-col gap-8 py-8">
			<Heading>Experience</Heading>
			<ul className="space-y-8">
				{sorted.slice(0, SLICE_INDEX).map(experience => (
					<Experience key={experience.title} {...experience} />
				))}
				<Expander className="space-y-8" expanded={isExpanded}>
					{sorted.slice(SLICE_INDEX).map(experience => (
						<Experience key={experience.title} {...experience} />
					))}
				</Expander>
			</ul>
			{sorted.length > SLICE_INDEX && (
				<Button
					className="mx-auto"
					onClick={() => setIsExpanded(prev => !prev)}
				>
					{isExpanded ? "Contract" : "Expand"}
				</Button>
			)}
		</section>
	);
};

export default ExperienceSection;
