import AboutSection from "@/components/about/about-section";
import ExperienceSection from "@/components/experience/experience-section";
import IntroSection from "@/components/intro/intro-section";
import ProjectSection from "@/components/projects/project-section";
import DecorationProvider from "@/components/providers/decoration-provider";

export default function Home() {
	return (
		<DecorationProvider>
			<main className="w-full divide-y divide-gray-800">
				<IntroSection className="min-h-screen" />
				<AboutSection />
				<ProjectSection />
				<ExperienceSection />
				{/* <ContactSection /> */}
			</main>
		</DecorationProvider>
	);
}
