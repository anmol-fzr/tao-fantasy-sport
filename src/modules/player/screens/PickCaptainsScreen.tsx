import { useNavigate } from "@tanstack/react-router";
import { ArrowRight2 } from "iconsax-react";
import { toast } from "sonner";
import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { useTeamStore } from "@/store/team.store";
import { CaptainTable } from "../components/CaptainTable";
import { TeamVersusCard } from "../components/TeamVersusCard";
import { useDraftStore } from "../store";

const { addTeam } = useTeamStore.getState();
const { reset } = useDraftStore.getState();
export function PickCaptainsScreen() {
	const players = useDraftStore((state) => state.players);
	const captainId = useDraftStore((state) => state.captainId);
	const viceCaptainId = useDraftStore((state) => state.viceCaptainId);

	const navigate = useNavigate();

	const handleTeamSave = () => {
		if (!captainId) {
			toast.error("Select a Captain to Proceed");
			return;
		}
		if (!viceCaptainId) {
			toast.error("Select a Vice Captain to Proceed");
			return;
		}

		addTeam({
			players,
			captainId,
			viceCaptainId,
		});
		reset();
		toast.success("Team Created Successfully");

		navigate({ to: "/teams" });
	};

	return (
		<Page>
			<Page.Header>
				<Page.GoBack
					to="/pick/players"
					search={{ sport: "" }}
					text="Pick Players"
				/>
			</Page.Header>

			<div className="mb-16 space-y-4">
				<div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 p-2">
					<TeamVersusCard />
				</div>

				<div>
					<h2 className="text-2xl mb-4">Choose Captains</h2>
					<CaptainTable />
				</div>
			</div>

			<Page.Footer>
				<Button size="lg" onClick={handleTeamSave}>
					Save Team
					<ArrowRight2 color="#000" />
				</Button>
			</Page.Footer>
		</Page>
	);
}
