import { useDraftStore } from "../store";

export const DraftTeamSummary = () => {
	const draftPlayerCount = useDraftStore((state) => state.players.length);
	const creditsLeft = useDraftStore((state) => state.creditsLeft);

	return (
		<div className="flex flex-col gap-4 text-sm sm:text-xl">
			<p>Max 7 players from a team</p>
			<div className="flex gap-16">
				<ScoreOutOfCardImpl
					score={draftPlayerCount}
					outOf={11}
					desc="Players"
				/>

				<ScoreOutOfCardImpl
					score={creditsLeft}
					outOf={100}
					desc="Credits Left"
				/>
			</div>
		</div>
	);
};

interface ScoreOutOfCardImplProps {
	score: number;
	outOf: number;
	desc: string;
}

const ScoreOutOfCardImpl = (props: ScoreOutOfCardImplProps) => {
	const { score, outOf, desc } = props;
	return (
		<div className="flex flex-col items-center">
			<p className="text-3xl">
				{score}
				<span className="text-muted-foreground text-xs">/ {outOf}</span>
			</p>
			<p className="text-muted-foreground text-xs">{desc}</p>
		</div>
	);
};
