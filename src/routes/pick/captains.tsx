import { createFileRoute } from "@tanstack/react-router";
import { PickCaptainsScreen } from "@/modules/player/screens/PickCaptainsScreen";

export const Route = createFileRoute("/pick/captains")({
	component: PickCaptainsScreen,
});
