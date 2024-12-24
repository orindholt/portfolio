import AboutSection from "@/components/about/about-section";
import ExperienceSection from "@/components/experience/experience-section";
import IntroSection from "@/components/intro/intro-section";
import ProjectSection from "@/components/projects/project-section";

export default function Home() {
	return (
		<main className="w-full divide-y divide-gray-800">
			<IntroSection className="min-h-screen" />
			<AboutSection />
			<ProjectSection />
			<ExperienceSection />
		</main>
	);
}
