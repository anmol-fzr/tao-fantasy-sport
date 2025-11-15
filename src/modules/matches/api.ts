import matches from "@/data/matches.json" with { type: "json" };

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
	ALL: () => matches,
	ONE: (id: MatchDetails["id"]) => {
		const allMatches = MATCHES.ALL();

		for (const [_sport, sportMatches] of Object.entries(allMatches.matches)) {
			for (const sportMatch of sportMatches) {
				if (sportMatch.id === id) {
					return sportMatch;
				}
			}
		}
		return null;
	},
} as const;
