"use client";

import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "./providers/theme-provider";

const Toaster = () => {
	const { theme } = useTheme();

	return <SonnerToaster theme={theme} position="bottom-right" richColors />;
};

export default Toaster;
