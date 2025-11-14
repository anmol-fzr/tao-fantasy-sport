import type { Player } from "@/modules/player/api";
import { getRoleCounts, getTeamCounts, validateCredits } from "./helpers";
import { draftRoleSchema } from "./schema";

export function validateAddPlayer(current: Player[], newPlayer: Player) {
	const updated = [...current, newPlayer];

	if (updated.length > 11) {
		return { ok: false, error: "You can select only 11 players." };
	}

	const creditCheck = validateCredits(updated);
	if (!creditCheck.ok) {
		return creditCheck;
	}

	try {
		const roleCounts = getRoleCounts(updated);
		draftRoleSchema.validateSync(roleCounts);
	} catch (e: any) {
		return { ok: false, error: e.message };
	}

	const teamCounts = getTeamCounts(updated);
	for (const team in teamCounts) {
		if (teamCounts[team] > 7) {
			return {
				ok: false,
				error: `Max 7 players allowed from ${team}.`,
			};
		}
	}

	return { ok: true };
}
