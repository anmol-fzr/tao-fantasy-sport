import { Eye } from "iconsax-react";
import { Button } from "@/components/ui/button";
import type { TeamWithId } from "@/store/team.store";
import type { PlayerRole } from "../api";
import { fullToShortPlayerRole, getRoleCounts } from "../helpers";

type TeamListItemProps = TeamWithId;

export const TeamListItem = (props: TeamListItemProps) => {
	const { players, captainId, viceCaptainId } = props;

	const obj = getRoleCounts(players);

	const captain = players.find((player) => player.id === captainId);
	const viceCaptain = players.find((player) => player.id === viceCaptainId);

	if (!captain) {
		return;
	}

	if (!viceCaptain) {
		return;
	}

	return (
		<div className="border rounded-lg p-4 ">
			<div className="flex flex-wrap justify-center sm:justify-start gap-4">
				<TeamPlayerImpl
					name={captain?.short_name}
					rank="Captain"
					team={{
						logo: captain?.team_logo,
						name: captain?.team_name,
					}}
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

			<div className="flex flex-wrap gap-8 bg-muted p-2 rounded-md px-4 items-center justify-center sm:justify-between">
				<div className="flex flex-wrap items-center justify-between rounded-md divide-x divide-muted-foreground ">
					{Object.entries(obj).map(([role, count]) => (
						<div className="flex flex-col items-center px-4" key={role}>
							<p className="text-muted-foreground">
								{fullToShortPlayerRole(role as PlayerRole)}
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
};

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
