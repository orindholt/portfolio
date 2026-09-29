"use client";

import { createContext, useContext, useEffect, useState } from "react";

export enum Theme {
	Light = "light",
	Dark = "dark",
}

interface ThemeContextProps {
	theme: Theme;
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

const STORAGE_KEY = "portfolio-theme";

const defaultTheme = Theme.Dark;

export const themeScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");document.documentElement.dataset.theme=t==="${Theme.Light}"?"${Theme.Light}":"${defaultTheme}"}catch(e){document.documentElement.dataset.theme="${defaultTheme}"}})()`;

function readTheme(): Theme {
	if (typeof document === "undefined") {
		return defaultTheme;
	}
	if (document.documentElement.dataset.theme === Theme.Light) {
		return Theme.Light;
	}
	return defaultTheme;
}

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<Theme>(readTheme);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;

		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch {
			return;
		}
	}, [theme]);

	function toggleTheme() {
		setTheme(theme => {
			if (theme === Theme.Dark) {
				return Theme.Light;
			}
			return Theme.Dark;
		});
	}

	const contextValue: ThemeContextProps = {
		theme,
		setTheme,
		toggleTheme,
	};

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

export default ThemeProvider;
