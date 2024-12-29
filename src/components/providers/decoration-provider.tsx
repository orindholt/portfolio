"use client";

import { createContext, useContext, useState } from "react";
import Snow from "../decoration/christmas/snow";
import DecorationOptions from "../decoration/decoration-options";

export enum Decorations {
	Snow = "snow",
}

interface DecorationContextProps {
	decorations: Array<Decorations>;
	setDecorations: React.Dispatch<React.SetStateAction<Array<Decorations>>>;
}

const DecorationContext = createContext<DecorationContextProps>(
	{} as DecorationContextProps
);

const defaultDecorations: Array<Decorations> = [];

const today = new Date();

if (today.getMonth() === 11) {
	defaultDecorations.push(Decorations.Snow);
}

const DecorationProvider = ({ children }: { children: React.ReactNode }) => {
	const [decorations, setDecorations] =
		useState<Array<Decorations>>(defaultDecorations);

	const contextValue: DecorationContextProps = {
		decorations,
		setDecorations,
	};

	return (
		<DecorationContext.Provider value={contextValue}>
			<DecorationOptions />
			<Snow />
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
