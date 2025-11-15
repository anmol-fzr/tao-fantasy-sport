import { Link, type LinkProps } from "@tanstack/react-router";
import type { Icon as IconType } from "iconsax-react";
import { ArrowLeft2 } from "iconsax-react";
import { cn } from "@/lib/utils";

interface GoBackProps extends LinkProps {
	className?: string;
	Icon?: IconType;
	text?: string;
}

export function GoBack(props: GoBackProps) {
	const {
		className = "",
		Icon = ArrowLeft2,
		text = "Go Back",
		...rest
	} = props;
	return (
		<Link {...rest} className={cn("inline-flex", className)}>
			<Icon size={24} color="white" />
			{text}
		</Link>
	);
}
