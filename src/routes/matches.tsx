import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { Page } from "@/components/page";
import { Steps } from "@/components/Steps";
import { MatchList } from "@/modules/matches/components/MatchList";
import { SportsList } from "@/modules/matches/components/SportsList";
import { getMatchesOpts } from "@/modules/player/hooks/queries";

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
	const { sport } = Route.useSearch();

	return (
		<Page>
			<Page.Header>
				<Steps currStep={0} />

				<Suspense fallback="loading ...">
					<SportsList />
				</Suspense>
			</Page.Header>

			<Page.Content className="mt-6">
				<Page.Title>Upcoming Matches {sport ? `for ${sport}` : ``}</Page.Title>
				<Suspense fallback="loading ...">
					<MatchList />
				</Suspense>
			</Page.Content>
		</Page>
	);
}
