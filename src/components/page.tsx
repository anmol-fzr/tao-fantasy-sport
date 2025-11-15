import type { PropsWithChildren } from "react";
import { GoBack } from "./GoBack";

export const Page = (props: PropsWithChildren) => {
	const { children } = props;

	return children;
};

Page.Header = (props: PropsWithChildren) => {
	const { children } = props;
	return (
		<header>
			<nav>{children}</nav>
		</header>
	);
};

Page.Footer = (props: PropsWithChildren) => {
	const { children } = props;
	return (
		<footer className="p-4 fixed inset-0 top-auto max-w-7xl mx-auto flex">
			<nav className="mr-0 ml-auto">{children}</nav>
		</footer>
	);
};

Page.GoBack = GoBack;
