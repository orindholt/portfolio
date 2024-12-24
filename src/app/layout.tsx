import ScrollProgress from "@/components/animation/scroll-progress";
import Footer from "@/components/footer";
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
	description: "Oliver Rindholt's personal website",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${unbounded.className} antialiased`}>
				<div
					id="root"
					className="min-h-screen flex flex-col max-w-screen-md w-full mx-auto px-8"
				>
					<ScrollProgress />
					{children}
					<Footer />
				</div>
			</body>
		</html>
	);
}
