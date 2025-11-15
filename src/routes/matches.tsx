import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { Steps } from "@/components/Steps";
import { MatchListItem } from "@/modules/matches/components/MatchList";
import { SportsList } from "@/modules/matches/components/SportsList";
import { getMatchesOpts, useGetMatches } from "@/modules/player/hooks/queries";

export const Route = createFileRoute("/matches")({
	component: RouteComponent,
	loader: ({ context }) => {
		context.queryClient.prefetchQuery(getMatchesOpts());
	},
	validateSearch: (search: Record<string, unknown>) => {
		return {
			sport: search.sport as string,
		};
	},
});

function RouteComponent() {
	const { matches } = useGetMatches();
	const { sport } = Route.useSearch();

	const match = matches[sport as keyof typeof matches];

	return (
		<Page>
			<Page.Header>
				<Steps currStep={0} />
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
