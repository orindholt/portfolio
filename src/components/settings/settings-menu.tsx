"use client";

import {
	Decorations,
	useDecoration,
} from "@/components/providers/decoration-provider";
import { Theme, useTheme } from "@/components/providers/theme-provider";
import { dropdown } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import {
	MoonIcon,
	SettingsIcon,
	SnowflakeIcon,
	SunIcon,
	type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SettingsMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [mounted, setMounted] = useState(false);

	const triggerRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!isOpen) return;

		function handlePointerDown(e: PointerEvent) {
			const target = e.target;
			if (target instanceof Node && containerRef.current?.contains(target)) {
				return;
			}
			setIsOpen(false);
		}

		document.addEventListener("pointerdown", handlePointerDown);

		return () => document.removeEventListener("pointerdown", handlePointerDown);
	}, [isOpen]);

	function close() {
		setIsOpen(false);
		triggerRef.current?.focus();
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		if (e.key === "Escape") {
			e.stopPropagation();
			close();
			return;
		}

		if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

		const items = Array.from(
			panelRef.current?.querySelectorAll<HTMLElement>("[data-menu-item]") ?? []
		);

		if (!items.length) return;

		e.preventDefault();

		const current = items.findIndex(item => item === document.activeElement);
		const offset = e.key === "ArrowDown" ? 1 : -1;
		const next = (current + offset + items.length) % items.length;

		items[next].focus();
	}

	if (!mounted) return null;

	return (
		<div
			ref={containerRef}
			className="fixed z-50 max-md:top-6 max-md:left-6 md:right-6 md:max-xl:bottom-6 xl:top-6"
		>
			<button
				ref={triggerRef}
				type="button"
				aria-label="Site settings"
				aria-haspopup="menu"
				aria-expanded={isOpen}
				onClick={() => setIsOpen(isOpen => !isOpen)}
				onKeyDown={e => {
					if (e.key !== "Escape" || !isOpen) return;
					close();
				}}
				className={cn(
					"size-9 p-2 rounded-full border border-gray-800 bg-background/80 backdrop-blur-sm flex items-center justify-center transition-colors",
					"outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
					isOpen ? "text-primary-500" : "text-foreground lg:hover:text-primary-500"
				)}
			>
				<SettingsIcon className="size-full" />
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						ref={panelRef}
						role="menu"
						aria-label="Site settings"
						onKeyDown={handleKeyDown}
						variants={dropdown}
						initial="hidden"
						animate="visible"
						exit="hidden"
						className={cn(
							"absolute w-56 flex flex-col gap-3 p-3 rounded-xl border border-gray-800 bg-linear-to-br from-gray-950 to-gray-900 text-sm normal-case",
							"max-md:top-full max-md:left-0 max-md:mt-2 max-md:origin-top-left",
							"md:max-xl:bottom-full md:max-xl:right-0 md:max-xl:mb-2 md:max-xl:origin-bottom-right",
							"xl:top-full xl:right-0 xl:mt-2 xl:origin-top-right"
						)}
					>
						<SettingsGroup label="Appearance">
							<div className="flex gap-1 p-1 rounded-lg border border-gray-800">
								<ThemeOption theme={Theme.Light} icon={SunIcon} label="Light" />
								<ThemeOption theme={Theme.Dark} icon={MoonIcon} label="Dark" />
							</div>
						</SettingsGroup>
						<hr className="border-t border-gray-600" />
						<SettingsGroup label="Decorations">
							<DecorationSwitch
								decoration={Decorations.Snow}
								icon={SnowflakeIcon}
								label="Snow"
							/>
						</SettingsGroup>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

function SettingsGroup({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div role="group" aria-label={label} className="flex flex-col gap-2">
			<span className="text-xs uppercase tracking-wide text-gray-300">
				{label}
			</span>
			{children}
		</div>
	);
}

function ThemeOption({
	theme,
	icon: Icon,
	label,
}: {
	theme: Theme;
	icon: LucideIcon;
	label: string;
}) {
	const { theme: activeTheme, setTheme } = useTheme();

	const isActive = activeTheme === theme;

	return (
		<button
			data-menu-item
			type="button"
			role="menuitemradio"
			aria-checked={isActive}
			onClick={() => setTheme(theme)}
			className={cn(
				"flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md transition-colors",
				"outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
				isActive
					? "bg-primary-600 text-white"
					: "text-gray-300 lg:hover:text-foreground"
			)}
		>
			<Icon className="size-4" />
			{label}
		</button>
	);
}

function DecorationSwitch({
	decoration,
	icon: Icon,
	label,
}: {
	decoration: Decorations;
	icon: LucideIcon;
	label: string;
}) {
	const { toggleDecoration, hasDecoration } = useDecoration();

	const isActive = hasDecoration(decoration);

	return (
		<button
			data-menu-item
			type="button"
			role="menuitemcheckbox"
			aria-checked={isActive}
			onClick={() => toggleDecoration(decoration)}
			className={cn(
				"flex items-center justify-between gap-3 px-2 py-1.5 rounded-md transition-colors lg:hover:bg-gray-700",
				"outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
			)}
		>
			<span className="flex items-center gap-2">
				<Icon className="size-4" />
				{label}
			</span>
			<span
				aria-hidden
				className={cn(
					"w-8 p-0.5 rounded-full flex transition-colors",
					isActive ? "bg-primary-500" : "bg-gray-500"
				)}
			>
				<span
					className={cn(
						"size-3.5 rounded-full bg-white transition-transform",
						isActive ? "translate-x-4" : "translate-x-0"
					)}
				/>
			</span>
		</button>
	);
}

export default SettingsMenu;
