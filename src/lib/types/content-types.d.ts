export type Svg = {
	viewBox: string;
	path: string | string[];
};

export interface Skill {
	name?: string;
	logoColor: string | string[];
	standaloneColor: string;
	textColor?: string;
	svg: Svg;
}

export interface Experience {
	title: string;
	company: string;
	companyLink: string;
	startDate: Date;
	endDate: Date | null;
	description: string;
}

export interface Project {
	title: string;
	slug: string;
	description: string;
	link?: string;
	repo?: string;
	tags: Skill[];
	startDate?: Date;
}

export type Theme = {
	50: string;
	100: string;
	200: string;
	300: string;
	400: string;
	500: string;
	600: string;
	700: string;
	800: string;
	900: string;
	950: string;
};

export type ButtonType = "button" | "submit" | "reset";
