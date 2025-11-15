import { type TeamWithId, useTeamStore } from "@/store/team.store";
import { EmptyTeamsList } from "./EmptyTeamsList";
import { TeamListItem } from "./TeamListItem";

export const TeamList = () => {
	const teams = useTeamStore((state) => state.teams);

	return <TeamListImpl teams={teams} />;
};

interface TeamListImplProps {
	teams: TeamWithId[];
}

const TeamListImpl = (props: TeamListImplProps) => {
	const { teams } = props;

	if (teams.length === 0) {
		return <EmptyTeamsList />;
	}

	return (
		<div className="gap-4 grid grid-cols-1 ">
			{teams.map((team) => (
				<TeamListItem key={team.id} {...team} />
			))}
		</div>
	);
};
