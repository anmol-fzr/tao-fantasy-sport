export interface IResMatches {
	matches: Matches;
}

export interface Matches {
	[key: string]: MatchDetails[];
}

export interface MatchDetails {
	id: number;
	short_name: string;
	is_ipl: number;
	match_name: string;
	event_id: number;
	team_a_id: number;
	team_b_id: number;
	event_name: string;
	sport_id: number;
	sport_type: string;
	announcement: null;
	toss_details: null;
	match_status: string;
	match_result: string;
	match_type: string;
	match_date: string;
	playing_xi_added: number;
	match_completed_at: null;
	t1_name: string;
	t2_name: string;
	t1_short_name: string;
	t2_short_name: string;
	t1_image: string;
	t2_image: string;
	leagues_joined: number;
	in_review: number;
}

export const MATCHES = {
	ALL: () => {
		return {
			matches: {
				cricket: [
					{
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
					},
				],
			},
		} as const;
	},
} as const;
