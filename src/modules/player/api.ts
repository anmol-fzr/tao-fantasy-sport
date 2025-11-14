import { axiosInst } from "@/lib/axios";

export type Players = Player[];
const roles = ["Bowler", "All-Rounder", "Batsman", "Wicket-Keeper"] as const;

export type PlayerRole = (typeof roles)[number];

export interface Player {
	id: number;
	player_id: string;
	name: string;
	role: PlayerRole;
	country: string;
	short_name: string;
	team_name: string;
	team_logo: string;
	team_short_name: string;
	event_total_points: number;
	event_player_credit: number;
	team_id: number;
	is_playing: boolean;
	player_stats_available: boolean;
}

export const PLAYERS = {
	ALL: () => axiosInst.get<Players>("/Get_All_Players_of_match.json"),
} as const;
