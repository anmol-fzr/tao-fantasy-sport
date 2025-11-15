import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
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
		<Page>
			<Page.Header>
				<SportsList />
			</Page.Header>

			<Page.Content className="mt-6">
				<Page.Title>Upcoming Matches {sport ? `for ${sport}` : ``}</Page.Title>
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
			</Page.Content>
		</Page>
	);
}
