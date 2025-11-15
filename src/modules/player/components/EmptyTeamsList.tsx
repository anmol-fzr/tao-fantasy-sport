import { Link } from "@tanstack/react-router";
import { Add, People } from "iconsax-react";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

export function EmptyTeamsList() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<People color="white" />
				</EmptyMedia>
				<EmptyTitle>No Teams Created Yet</EmptyTitle>
				<EmptyDescription>
					You haven&apos;t created any teams yet. Get started by creating your
					first team.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<div className="flex gap-2">
					<Button asChild>
						<Link to="/matches" search={{ sport: "" }}>
							<Add color="black" />
							Create Team
						</Link>
					</Button>
				</div>
			</EmptyContent>
		</Empty>
	);
}
