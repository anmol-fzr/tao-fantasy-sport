import { createFileRoute } from "@tanstack/react-router";
import { Eye } from "iconsax-react";
import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { fullToShortPlayerRole, getRoleCounts } from "@/modules/player/helpers";
import { useTeamStore } from "@/store/team.store";

export const Route = createFileRoute("/teams")({
	component: RouteComponent,
});

function RouteComponent() {
	const teams = [];
	//useTeamStore((state) => state.teams);

	return (
		<Page>
			<Page.Header></Page.Header>
			<Page.Content>
				<Page.Title>My Teams</Page.Title>

				{teams.map((team) => {
					const obj = getRoleCounts(team.players);
					const captain = team.players.find(
						(player) => player.id === team.captainId,
					);

					const viceCaptain = team.players.find(
						(player) => player.id === team.viceCaptainId,
					);
					return (
						<div key={team.id} className="border rounded-lg p-4 ">
							<div className="flex flex-wrap justify-center sm:justify-start gap-4">
								<TeamPlayerImpl
									name={captain?.short_name}
									rank="Captain"
									team={{ logo: captain?.team_logo, name: captain?.team_name }}
								/>

								<TeamPlayerImpl
									name={viceCaptain?.short_name}
									rank="Vice Captain"
									team={{
										logo: viceCaptain?.team_logo,
										name: viceCaptain?.team_name,
									}}
								/>
							</div>

							<div className="flex flex-wrap gap-8 bg-muted p-2 rounded-md px-6 items-center justify-center sm:justify-between">
								<div className="flex flex-wrap items-center gap-8 justify-between p-2 rounded-md px-6 ">
									{Object.entries(obj).map(([role, count]) => (
										<div className="flex flex-col items-center" key={role}>
											<p className="text-muted-foreground">
												{fullToShortPlayerRole(role)}
											</p>
											<p>{count}</p>
										</div>
									))}
								</div>
								<Button>
									<Eye color="black" />
									Team Preview
								</Button>
							</div>
						</div>
					);
				})}
			</Page.Content>

			<Page.Footer></Page.Footer>
		</Page>
	);
}

interface TeamPlayerImpl {
	team: {
		name: string;
		logo: string;
	};
	name: string;
	rank: string;
}

const TeamPlayerImpl = (props: TeamPlayerImpl) => {
	const { team, name, rank } = props;
	return (
		<div className="flex gap-4 items-end p-2">
			<img src={team.logo} alt={team.name} className="size-16" />
			<div>
				<p className="text-xl font-medium">{name}</p>
				<p className="text-green-400 capitalize">{rank}</p>
			</div>
		</div>
	);
};
