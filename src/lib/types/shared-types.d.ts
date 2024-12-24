export type Params = Readonly<{
	params: {};
}>;

export type PageProps = Params &
	Readonly<{
		searchParams: Record<string, string>;
	}>;

export type LayoutProps = Params &
	Readonly<{
		children: React.ReactNode;
	}>;

export type DynamicElement<T extends React.ElementType> = {
	as?: T;
} & React.ComponentPropsWithoutRef<T>;

export type LinkProps = Omit<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	keyof InternalLinkProps
> &
	InternalLinkProps;
