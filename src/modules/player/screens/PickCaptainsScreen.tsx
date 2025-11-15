import { GoBack } from "@/components/GoBack";
import { CaptainTable } from "../components/CaptainTable";
import { useDraftStore } from "../store";

export function PickCaptainsScreen() {
	const players = useDraftStore((state) => state.players);
	return (
		<>
			<header>
				<nav>
					<GoBack to="/matches" search={{ sport: "" }} text="Contest" />
				</nav>
			</header>

			<div>
				<CaptainTable />
			</div>
		</>
	);
}
