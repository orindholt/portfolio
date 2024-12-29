import ScrollProgress from "@/components/animation/scroll-progress";
import Container from "@/components/container";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import DecorationProvider from "@/components/providers/decoration-provider";
import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "./globals.css";

const unbounded = Unbounded({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Oliver Rindholt",
	description: "A fullstack web developer based in Copenhagen",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${unbounded.className} antialiased`}>
				<div id="root" className="min-h-screen flex flex-col">
					<ScrollProgress />
					<Navigation />
					<Container>
						<DecorationProvider>{children}</DecorationProvider>
						<Footer />
					</Container>
				</div>
			</body>
		</html>
	);
}
