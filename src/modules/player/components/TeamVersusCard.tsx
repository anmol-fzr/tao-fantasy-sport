import { ViewTransition } from "@/components/transition";
import { MATCHES } from "@/modules/matches/api";
import { MatchListItem } from "@/modules/matches/components/MatchList";
import { useDraftStore } from "../store";

export const TeamVersusCard = () => {
	const matchId = useDraftStore((state) => state.matchId);
	const match = MATCHES.ONE(matchId);

	if (match === null) {
		return;
	}

	const { t1_image, t1_name, t2_image, t2_name } = match;

	return (
		<ViewTransition name={t1_image + t2_image}>
			<TeamVersusCardImpl
				team1={{ image: t1_image, name: t1_name }}
				team2={{ image: t2_image, name: t2_name }}
			/>
		</ViewTransition>
	);
};

interface TeamDetails {
	image: string;
	name: string;
}

interface TeamVersusCardImplProps {
	team1: TeamDetails;
	team2: TeamDetails;
}

const TeamVersusCardImpl = (props: TeamVersusCardImplProps) => {
	const { team1, team2 } = props;
	return (
		<div className="flex gap-4 ">
			<TeamVersusCardImpl.Image {...team1} />
			<TeamVersusCardImpl.Image {...team2} />
		</div>
	);
};

TeamVersusCardImpl.Image = (props: TeamDetails) => {
	const { image, name } = props;
	return (
		<div className="bg-background/50 border p-3 rounded-full aspect-square">
			<ViewTransition name={`match-image-${name}`}>
				<MatchListItem.Image className="size-16" src={image} alt={name} />
			</ViewTransition>
		</div>
	);
};
