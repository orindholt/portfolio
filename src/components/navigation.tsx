"use client";

import { LinkProps } from "@/lib/types/shared-types";
import { cn, getCSSVariableValue } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "./logo";

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	function handleNavigation(e: React.MouseEvent<HTMLAnchorElement>) {
		const target = e.currentTarget;
		const hash = target.hash;

		if (!hash) return;

		const element = document.querySelector(hash);

		e.preventDefault();
		setIsOpen(false);

		if (hash === "#top") {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		} else if (element) {
			const navbarHeight = parseFloat(
				getCSSVariableValue("--navbar-height").replace("px", "")
			);
			const offset =
				element.getBoundingClientRect().top + window.scrollY - navbarHeight;
			window.scrollTo({
				top: offset,
				behavior: "smooth",
			});
		}
	}

	return (
		<nav className="h-[var(--navbar-height)] sticky top-0 inset-x-0 z-40 px-6 flex items-center max-md:justify-end md:bg-gradient-to-b from-black/75 to-transparent">
			<ul
				className={cn(
					"flex max-md:flex-col items-center max-md:justify-center max-w-3xl xl:max-w-5xl mx-auto max-md:gap-12 flex-1 max-md:fixed max-md:inset-0 max-md:transition-transform max-md:duration-500 max-md:ease-in-out max-md:bg-black max-md:bg-opacity-90 max-md:backdrop-blur-sm md:text-base text-4xl",
					isOpen ? "max-md:translate-x-0" : "max-md:translate-x-full"
				)}
			>
				<NavigationLink onClick={handleNavigation} href="#top">
					Surface
				</NavigationLink>
				<NavigationSeparator />
				<NavigationLink onClick={handleNavigation} href="#about">
					Biography
				</NavigationLink>
				<NavigationLink
					onClick={handleNavigation}
					href="#top"
					className="max-md:hidden !flex-initial"
					aria-label="Top"
				>
					<Logo className="max-md:hidden" width={40} height={40} />
				</NavigationLink>
				<NavigationLink onClick={handleNavigation} href="#projects">
					Projects
				</NavigationLink>
				<NavigationSeparator />
				<NavigationLink onClick={handleNavigation} href="#experience">
					Experience
				</NavigationLink>
			</ul>
			<button
				name={isOpen ? "Close menu" : "Open menu"}
				type="button"
				className="relative z-10 size-8 flex items-center justify-center md:hidden"
				onClick={() => setIsOpen(prev => !prev)}
			>
				{!isOpen ? (
					<MenuIcon className="size-full" />
				) : (
					<XIcon className="size-full" />
				)}
			</button>
		</nav>
	);
};

function NavigationSeparator() {
	return (
		<span aria-hidden className="text-white text-3xl">
			&#x2022;
		</span>
	);
}

function NavigationLink({ href, className, children, ...props }: LinkProps) {
	return (
		<li className={cn("relative group/link uppercase md:flex-1", className)}>
			<Link
				href={href}
				className="w-full h-full md:hover:text-primary-500 flex justify-center"
				{...props}
			>
				{children}
			</Link>
			<div className="absolute -bottom-2 inset-x-0 h-0.5 bg-gray-normal mx-auto transition-all w-0 md:group-hover/link:w-full ease-in-out duration-300" />
		</li>
	);
}

export default Navigation;
