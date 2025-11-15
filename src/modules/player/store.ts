import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Player, Players } from "@/modules/player/api";
import type { MatchDetails } from "../matches/api";
import { getTotalCredits, MAX_CREDITS } from "./helpers";

type PlayerId = Player["id"];
type MatchId = MatchDetails["id"];

interface DraftState {
	matchId: MatchId;
	setMatchId: (id: MatchId) => void;

	players: Players;
	addPlayer: (player: Player) => void;
	setPlayers: (players: Players) => void;
	removePlayer: (playerId: PlayerId) => void;

	captainId: PlayerId | null;
	setCaptain: (id: PlayerId) => void;

	viceCaptainId: PlayerId | null;
	setViceCaptain: (id: PlayerId) => void;

	credits: number;
	creditsLeft: number;

	reset: () => void;
}

export const useDraftStore = create<DraftState>()(
	persist(
		(set, get) => ({
			matchId: 0,
			setMatchId: (matchId) => set({ matchId }),

			players: [],

			captainId: null,
			viceCaptainId: null,

			credits: MAX_CREDITS,
			creditsLeft: MAX_CREDITS,

			addPlayer: (player) => {
				const updated = [...get().players, player];
				const used = getTotalCredits(updated);

				set({
					players: updated,
					creditsLeft: MAX_CREDITS - used,
				});
			},

			setPlayers: (players) => {
				const used = getTotalCredits(players);

				set({
					players,
					creditsLeft: MAX_CREDITS - used,
				});
			},

			removePlayer: (playerId) => {
				const updated = get().players.filter((p) => p.id !== playerId);
				const used = getTotalCredits(updated);

				set({
					players: updated,
					creditsLeft: MAX_CREDITS - used,
				});
			},

			setCaptain: (id) => set({ captainId: id }),
			setViceCaptain: (id) => set({ viceCaptainId: id }),

			reset: () => {
				set({
					matchId: 0,
					players: [],
					captainId: null,
					viceCaptainId: null,
					credits: MAX_CREDITS,
					creditsLeft: MAX_CREDITS,
				});
			},
		}),
		{ name: "draft-team-store" },
	),
);
