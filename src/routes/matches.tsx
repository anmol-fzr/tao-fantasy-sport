import { createFileRoute } from "@tanstack/react-router";
import { MATCHES } from "@/modules/matches/api";
import { MatchListItem } from "@/modules/matches/components/MatchList";
import { SportsList } from "@/modules/matches/components/SportsList";

export const Route = createFileRoute("/matches")({
	component: RouteComponent,
	validateSearch: (search: Record<string, unknown>) => {
		return {
			sport: search.sport as string,
		};
	},
});

function RouteComponent() {
	const { matches } = MATCHES.ALL();
	const { sport } = Route.useSearch();

	const match = matches[sport as keyof typeof matches];

	return (
		<div className="space-y-6">
			<SportsList />

			<div className="space-y-6">
				<h2 className="text-2xl font-semibold capitalize">
					Upcoming Matches {sport ? `for ${sport}` : ``}
				</h2>
				<div className="flex flex-col gap-4">
					{sport?.length > 0
						? match.map((match) => (
								<div key={match.id} className="p-2 space-y-2">
									<MatchListItem {...match} />
								</div>
							))
						: Object.entries(matches).map(([title, matchs]) => (
								<div key={title}>
									<p className="capitalize text-2xl">{title}</p>
									<ul className="p-2 space-y-2">
										{matchs.map((match) => (
											<MatchListItem key={match.id} {...match} />
										))}
									</ul>
								</div>
							))}
				</div>
			</div>
		</div>
	);
}
