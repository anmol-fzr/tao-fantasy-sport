import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export const NotFound = () => {
	return (
		<div className="min-h-[70vh] flex items-center justify-center">
			<div className="flex flex-col items-center gap-12 ">
				<h1 className="text-5xl">Looks Like you lost you way</h1>
				<h2 className="text-xl">404 - Not Found</h2>
				<Button asChild>
					<Link to="/matches" search={{ sport: "" }}>
						Back to Matches
					</Link>
				</Button>
			</div>
		</div>
	);
};
