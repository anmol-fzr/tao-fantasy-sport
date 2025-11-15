import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { TeamPlayerImpl } from "@/modules/player/components/TeamListItem";
import { useTeamStore } from "@/store/team.store";

export const Route = createFileRoute("/team/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const team = useTeamStore((state) =>
		state.teams.find((team) => team.id.toString() === id),
	);
	if (!team) {
		return "Team Not Found";
	}
	const { players, captainId, viceCaptainId } = team;

	const captain = players.find((player) => player.id === captainId);
	const viceCaptain = players.find((player) => player.id === viceCaptainId);

	if (!captain) {
		return;
	}

	if (!viceCaptain) {
		return;
	}

	return (
		<Page>
			<Page.Header>
				<Page.GoBack to="/teams" text="My Teams" />
			</Page.Header>
			<Page.Content>
				<ul>
					{players?.map((player) => (
						<TeamPlayerImpl
							key={player.id}
							name={player.name}
							rank={
								player.id === captainId
									? "Captain"
									: player.id === viceCaptainId
										? "Vice Captain"
										: player.role
							}
							team={{
								logo: player?.team_logo,
								name: player?.team_name,
							}}
						/>
					))}
				</ul>
			</Page.Content>
		</Page>
	);
}
