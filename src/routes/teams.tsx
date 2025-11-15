import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { TeamList } from "@/modules/player/components/TeamList";

export const Route = createFileRoute("/teams")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Page>
			<Page.Title>My Teams</Page.Title>

			<Page.Content>
				<TeamList />
			</Page.Content>
		</Page>
	);
}
