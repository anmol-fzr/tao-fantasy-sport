import { Link, useSearch } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Page } from "@/components/page";
import { MATCHES } from "../api";

export const SportsList = () => {
	const { matches: data } = MATCHES.ALL();
	const { sport } = useSearch({ from: "/matches" });

	const matches = Object.keys(data).map((match) => ({
		title: match,
		sport: match,
	}));

	return <SportsListImpl matches={matches} selectedSport={sport} />;
};

interface SportsListImplProps {
	matches: { title: string; sport: string }[];
	selectedSport: string;
}

const SportsListImpl = ({ matches, selectedSport }: SportsListImplProps) => {
	return (
		<div className="space-y-2">
			<Page.Title>Contest</Page.Title>
			<div className="flex gap-4">
				<SportLink sport="" isSelected={!selectedSport}>
					All
				</SportLink>

				{matches.map((match) => (
					<SportLink
						key={match.title}
						sport={match.sport}
						isSelected={match.sport === selectedSport}
					>
						{match.sport}
					</SportLink>
				))}
			</div>
		</div>
	);
};

interface SportLinkProps {
	sport: string;
	isSelected: boolean;
	children: ReactNode;
}

const SportLink = (props: SportLinkProps) => {
	const { isSelected, sport, children } = props;
	return (
		<Link
			to="/matches"
			viewTransition
			search={{ sport }}
			className={`border border-white p-2 px-4 rounded-full flex items-center justify-center capitalize ${isSelected ? "bg-white text-black" : ""}`}
		>
			{children}
		</Link>
	);
};
