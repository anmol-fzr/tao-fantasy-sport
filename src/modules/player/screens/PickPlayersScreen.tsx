import { Link } from "@tanstack/react-router";
import { ArrowLeft2 } from "iconsax-react";
import { ViewTransition } from "@/components/transition";
import { MatchListItem } from "@/modules/matches/components/MatchList";
import { PlayersTable } from "../components/PlayersTable";
import { useDraftStore } from "../store";

const selectedMatch = {
	id: 6432,
	short_name: "",
	is_ipl: 0,
	match_name: "MS vs PS",
	event_id: 390,
	team_a_id: 477,
	team_b_id: 467,
	event_name: "Big T20 Bash",
	sport_id: 1,
	sport_type: "cricket",
	announcement: null,
	toss_details: null,
	match_status: "upcoming",
	match_result: "Not Started",
	match_type: "T20",
	match_date: "2022-02-23T08:15+00:00",
	playing_xi_added: 0,
	match_completed_at: null,
	t1_name: "Melbourne Stars",
	t2_name: "Perth Scorchers",
	t1_short_name: "MS",
	t2_short_name: "PS",
	t1_image:
		"https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png",
	t2_image:
		"https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png",
	leagues_joined: 0,
	in_review: 0,
};

export const PickPlayersScreen = () => {
	const draftPlayerCount = useDraftStore((state) => state.players.length);
	const creditsLeft = useDraftStore((state) => state.creditsLeft);

	return (
		<>
			<header>
				<nav>
					<Link to="/matches" search={{ sport: "" }} className="inline-flex">
						<ArrowLeft2 size={24} color="white" />
						Contest
					</Link>
				</nav>
			</header>
			<div>
				<div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 p-2">
					<div className="flex gap-4 ">
						<div className="bg-white p-1 rounded-full aspect-square">
							<ViewTransition name={`match-image-${selectedMatch.t1_image}`}>
								<MatchListItem.Image
									className="size-16"
									src={selectedMatch.t1_image}
									alt={selectedMatch.t1_name}
								/>
							</ViewTransition>
						</div>

						<div className="bg-white p-1 rounded-full aspect-square">
							<img
								src={selectedMatch.t2_image}
								alt={selectedMatch.t2_name}
								className="size-16"
							/>
						</div>
					</div>

					<div className="flex flex-col gap-4 text-sm sm:text-xl">
						<p>Max 7 players from a team</p>
						<div className="flex gap-16">
							<div className="flex flex-col items-center">
								<p className="text-3xl">
									{draftPlayerCount}{" "}
									<span className="text-muted-foreground text-xs">/ 11</span>
								</p>
								<p className="text-muted-foreground text-xs">Players</p>
							</div>

							<div className="flex flex-col items-center">
								<p className="text-3xl">{creditsLeft} </p>
								<p className="text-muted-foreground text-xs">Credits Left</p>
							</div>
						</div>
					</div>
				</div>

				<div>
					<h2 className="text-2xl mb-4">Choose Team</h2>
					<PlayersTable />
				</div>
			</div>
		</>
	);
};
