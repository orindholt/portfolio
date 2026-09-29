"use client";

import { createContext, useContext, useState } from "react";

export enum Decorations {
	Snow = "snow",
}

interface DecorationContextProps {
	decorations: Array<Decorations>;
	setDecorations: React.Dispatch<React.SetStateAction<Array<Decorations>>>;
	toggleDecoration: (decoration: Decorations) => void;
	hasDecoration: (decoration: Decorations) => boolean;
}

const DecorationContext = createContext<DecorationContextProps | null>(null);

const defaultDecorations: Array<Decorations> = [];

const today = new Date();

if (today.getMonth() === 11) {
	defaultDecorations.push(Decorations.Snow);
}

const DecorationProvider = ({ children }: { children: React.ReactNode }) => {
	const [decorations, setDecorations] =
		useState<Array<Decorations>>(defaultDecorations);

	function toggleDecoration(decoration: Decorations) {
		setDecorations(decorations => {
			if (decorations.includes(decoration)) {
				return decorations.filter(d => d !== decoration);
			}
			return [...decorations, decoration];
		});
	}

	function hasDecoration(decoration: Decorations) {
		return decorations.includes(decoration);
	}

	const contextValue: DecorationContextProps = {
		decorations,
		setDecorations,
		toggleDecoration,
		hasDecoration,
	};

	return (
		<DecorationContext.Provider value={contextValue}>
			{children}
		</DecorationContext.Provider>
	);
};

export const useDecoration = () => {
	const context = useContext(DecorationContext);
	if (!context) {
		throw new Error("useDecoration must be used within a DecorationProvider");
	}
	return context;
};

export default DecorationProvider;
