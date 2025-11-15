import * as Yup from "yup";
import type { PlayerRole } from "@/modules/player/api";

const ROLE_LIMITS: Record<PlayerRole, { min: number; max: number }> = {
	Batsman: { min: 3, max: 7 },
	"Wicket-Keeper": { min: 1, max: 5 },
	"All-Rounder": { min: 0, max: 4 },
	Bowler: { min: 3, max: 7 },
};

export const draftRoleSchema = Yup.object(
	Object.fromEntries(
		Object.entries(ROLE_LIMITS).map(([role, { max }]) => [
			role,
			Yup.number().max(max, `At most ${max} ${role}s allowed`).default(0),
		]),
	),
).required();
