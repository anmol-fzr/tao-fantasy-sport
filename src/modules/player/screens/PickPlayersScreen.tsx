import { useNavigate } from "@tanstack/react-router";
import { ArrowRight2 } from "iconsax-react";
import { toast } from "sonner";
import { Page } from "@/components/page";
import { startTransition } from "@/components/transition";
import { Button } from "@/components/ui/button";
import { DraftTeamSummary } from "../components/DraftTeamSummary";
import { PlayersTable } from "../components/PlayersTable";
import { TeamVersusCard } from "../components/TeamVersusCard";
import { useDraftStore } from "../store";

export const PickPlayersScreen = () => {
	const draftPlayerCount = useDraftStore((state) => state.players.length);
	const navigate = useNavigate();

	const handleTeamSave = () => {
		if (draftPlayerCount !== 11) {
			toast.error("Make a Team of 11 players to proceed");
			return;
		}
		startTransition(() => {
			navigate({ to: "/pick/captains" });
		});
	};

	return (
		<Page>
			<Page.Header>
				<Page.GoBack to="/matches" search={{ sport: "" }} text="Contest" />
			</Page.Header>

			<Page.Content>
				<div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 p-2">
					<TeamVersusCard />

					<DraftTeamSummary />
				</div>

				<div>
					<Page.Title>Choose Team</Page.Title>
					<PlayersTable />
				</div>
			</Page.Content>

			<Page.Footer>
				<Button size="lg" onClick={handleTeamSave}>
					Save Team
					<ArrowRight2 color="#000" />
				</Button>
			</Page.Footer>
		</Page>
	);
};
