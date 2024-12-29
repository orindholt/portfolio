import Section from "../section";
import SkillSlider from "./skill-slider";

const AboutSection = () => {
	return (
		<Section title="About" id="about">
			<div className="space-y-4">
				<h3 className="font-bold text-4xl normal-case">
					<span className="inline-block animate-wave origin-bottom-right will-change-transform relative -top-1">
						👋
					</span>{" "}
					Hello!
				</h3>
				<p>A fullstack web developer based in Copenhagen</p>
				<p>
					I take pride in writing clean, efficient, and readable code
					that&apos;s easy to interpret and scale.
				</p>
				<p>
					I excel in learning new technologies and languages, documenting
					development processes, and building responsive fullstack solutions. My
					focus area is on modern tech-stacks, but I&apos;m adept at seamlessly
					integrating and adapting to older and legacy tech environments.
				</p>
				<p>
					Described by classmates, coworkers, and myself as a team player,
					trusted ally, and quick learner.
				</p>
			</div>
			<SkillSlider className="py-8" />
		</Section>
	);
};

export default AboutSection;
