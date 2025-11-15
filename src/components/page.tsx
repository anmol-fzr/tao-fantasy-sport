import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
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

Page.Title = (props: ComponentPropsWithoutRef<"h1">) => {
	const { className, ...rest } = props;
	return (
		<h1 className={cn("text-2xl mb-4 font-semibold", className)} {...rest} />
	);
};

Page.SubTitle = (props: ComponentPropsWithoutRef<"h2">) => {
	const { className, ...rest } = props;
	return <h2 className={cn("text-xl mb-4 font-medium", className)} {...rest} />;
};

Page.Content = (props: ComponentPropsWithoutRef<"div">) => {
	const { className, ...rest } = props;
	return <div className={cn("mb-16 space-y-4", className)} {...rest} />;
};

Page.Footer = (props: PropsWithChildren) => {
	const { children } = props;
	return (
		<footer className="p-4 fixed inset-0 bottom-18 top-auto max-w-7xl mx-auto flex">
			<nav className="mr-0 ml-auto">{children}</nav>
		</footer>
	);
};

Page.GoBack = GoBack;
