import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Player, Players } from "@/modules/player/api";

type PlayerId = Player["id"];

interface Team {
	players: Players;
	captainId: PlayerId;
	viceCaptainId: PlayerId;
}

type TeamWithId = Team & {
	id: number;
};

interface TeamStoreState {
	teams: TeamWithId[];
	setTeams: (teams: TeamWithId[]) => void;
	addTeam: (team: Team) => void;
	removeTeam: (teamId: number) => void;

	reset: () => void;
}

export const useTeamStore = create<TeamStoreState>()(
	persist(
		(set, get) => ({
			teams: [],
			setTeams: (teams) => {
				set({ teams });
			},

			addTeam: (team) => {
				const currTeams = get().teams;

				const newTeam: TeamWithId = {
					id: currTeams.length + 1,
					...team,
				};

				const updated = [...currTeams, newTeam];

				set({
					teams: updated,
				});
			},

			removeTeam: (teamId) => {
				const newTeams = get().teams.filter((t) => t.id !== teamId);

				set({
					teams: newTeams,
				});
			},

			reset: () => {
				set({});
			},
		}),
		{ name: "teams-store" },
	),
);
