import { createFileRoute } from "@tanstack/react-router";
import { getPlayersOpts } from "@/modules/player/hooks/queries";
import { PickPlayersScreen } from "@/modules/player/screens/PickPlayersScreen";

export const Route = createFileRoute("/pick/players")({
	component: PickPlayersScreen,
	loader: ({ context }) => {
		const opts = getPlayersOpts();
		context.queryClient.prefetchQuery(opts);
	},
});
