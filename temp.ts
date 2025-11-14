import type { PlayerRole } from "@/modules/player/api";
import * as Yup from "yup";
import type { NumberSchema } from "yup";

const LIMITS: Record<PlayerRole, { min: number; max: number }> = {
  Batsman: { min: 3, max: 7 },
  "Wicket-Keeper": { min: 1, max: 5 },
  "All-Rounder": { min: 0, max: 4 },
  Bowler: { min: 3, max: 7 },
};

const createSchema = (
  limits: Record<PlayerRole, { min: number; max: number }>,
) => {
  const coreSchema: Record<PlayerRole, NumberSchema> = {};

  Object.entries(limits).forEach(([role, { min, max }]) => {
    coreSchema[role] = Yup.number().min(min, `Atleast ${min} ${role}s must be in the team`).max(max, `Atmax ${max} ${role}s must be in the team`).required().default(0);
  });

  return Yup.object(coreSchema).required()
};


const j = createSchema(LIMITS)

j.validate({Batsman: 3}).then(console.log).catch((err) => console.log(err.message))
