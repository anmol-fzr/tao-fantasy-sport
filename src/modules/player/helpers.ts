import type { Player, PlayerRole } from "@/modules/player/api";

export function getRoleCounts(players: Player[]) {
	const counts: Record<PlayerRole, number> = {
		Batsman: 0,
		"Wicket-Keeper": 0,
		"All-Rounder": 0,
		Bowler: 0,
	};

	players.forEach((p) => {
		counts[p.role]++;
	});

	return counts;
}

export function getCredits(players: Player[]) {
	return players.reduce((sum, p) => sum + p.event_player_credit, 0);
}

export function getTeamCounts(players: Player[]) {
	const teams: Record<string, number> = {};
	players.forEach((p) => {
		teams[p.team_short_name] = (teams[p.team_short_name] || 0) + 1;
	});
	return teams;
}

export const MAX_CREDITS = 100;

export function getTotalCredits(players: Player[]) {
	return players.reduce((sum, p) => sum + Number(p.event_player_credit), 0);
}

export function validateCredits(players: Player[]) {
	const credits = getTotalCredits(players);

	if (credits > MAX_CREDITS) {
		return {
			ok: false,
			error: `Credit limit exceeded. Can't pick this Player`,
		};
	}

	return { ok: true };
}
