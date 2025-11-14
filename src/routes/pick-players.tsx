import { createFileRoute } from "@tanstack/react-router";
import { PickPlayersScreen } from "@/modules/player/screens/PickPlayersScreen";

export const Route = createFileRoute("/pick-players")({
	component: PickPlayersScreen,
});
