import ScrollProgress from "@/components/animation/scroll-progress";
import Container from "@/components/container";
import Snow from "@/components/decoration/christmas/snow";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import DecorationProvider from "@/components/providers/decoration-provider";
import ThemeProvider, { themeScript } from "@/components/providers/theme-provider";
import SettingsMenu from "@/components/settings/settings-menu";
import Toaster from "@/components/toaster";
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
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body className={`${unbounded.className} antialiased`}>
				<ThemeProvider>
					<DecorationProvider>
						<div id="root" className="min-h-screen flex flex-col">
							<ScrollProgress />
							<Navigation />
							<SettingsMenu />
							<Container>
								{children}
								<Footer />
							</Container>
						</div>
						<Snow />
						<Toaster />
					</DecorationProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
