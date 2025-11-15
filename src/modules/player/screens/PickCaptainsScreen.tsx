import { GoBack } from "@/components/GoBack";
import { CaptainTable } from "../components/CaptainTable";

export function PickCaptainsScreen() {
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
