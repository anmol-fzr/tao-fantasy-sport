import { ViewTransition } from "@/components/transition";
import { MatchListItem } from "@/modules/matches/components/MatchList";
import { useGetMatch } from "../hooks/queries";
import { useDraftStore } from "../store";

export const TeamVersusCard = () => {
	const matchId = useDraftStore((state) => state.matchId);
	const { match } = useGetMatch(matchId);

	if (!match) {
		return;
	}

	const { t1_image, t1_short_name, t1_name, t2_image, t2_short_name, t2_name } =
		match;

	return (
		<ViewTransition name={t1_image + t2_image}>
			<TeamVersusCardImpl
				team1={{ image: t1_image, name: t1_name, shortName: t1_short_name }}
				team2={{ image: t2_image, name: t2_name, shortName: t2_short_name }}
			/>
		</ViewTransition>
	);
};

interface TeamDetails {
	image: string;
	name: string;
	shortName: string;
}

interface TeamVersusCardImplProps {
	team1: TeamDetails;
	team2: TeamDetails;
}

const TeamVersusCardImpl = (props: TeamVersusCardImplProps) => {
	const { team1, team2 } = props;
	return (
		<div className="flex gap-4 items-center">
			<MatchListItem.Team {...team1} />

			<p className="text-muted-foreground">VS</p>

			<MatchListItem.Team {...team2} />
		</div>
	);
};
