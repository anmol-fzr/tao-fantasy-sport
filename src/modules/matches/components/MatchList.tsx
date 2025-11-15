import { Link, useNavigate } from "@tanstack/react-router";
import { Calendar, Clock } from "iconsax-react";
import type { ComponentPropsWithoutRef } from "react";
import { startTransition, ViewTransition } from "@/components/transition";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDraftStore } from "@/modules/player/store";
import type { MatchDetails } from "../api";

interface MatchListItemProps extends MatchDetails {}

export const MatchListItem = (props: MatchListItemProps) => {
	const setMatchId = useDraftStore((state) => state.setMatchId);

	const {
		id,
		t1_image,
		t1_short_name,
		t2_short_name,
		t1_name,
		event_name,
		match_name,
		t2_image,
		t2_name,
		match_date,
	} = props;

	const navigate = useNavigate();

	function handlePickPlayers() {
		startTransition(() => {
			setMatchId(id);
			navigate({ to: "/pick/players" });
		});
	}

	return (
		<ViewTransition name={`match-${id}`}>
			<div className="p-4 rounded-xl border flex flex-col gap-4">
				<div className="flex w-full justify-between items-center">
					<span className="flex items-center gap-2">
						<ViewTransition name={`match-image-${t1_image}`}>
							<MatchListItem.Image src={t1_image} alt={t1_name} />
						</ViewTransition>
						<p className="sm:hidden">{t1_short_name}</p>
						<p className="hidden sm:block">{t1_name}</p>
					</span>
					<p className="text-muted-foreground">VS</p>
					<span className="flex items-center gap-2">
						<p className="sm:hidden">{t2_short_name}</p>
						<p className="hidden sm:block">{t2_name}</p>
						<ViewTransition name={`match-image-${t2_image}`}>
							<MatchListItem.Image src={t2_image} alt={t2_name} />
						</ViewTransition>
					</span>
				</div>
				<div className="flex w-full justify-between items-center">
					<p className="text-muted-foreground inline-flex gap-2 justify-end">
						<Calendar color="#efefef" size={20} />
						{new Intl.DateTimeFormat("en-IN").format(new Date(match_date))}
					</p>

					<p className="hidden sm:block">{event_name}</p>

					<p className="text-muted-foreground uppercase inline-flex gap-2 justify-end">
						<Clock color="#efefef" size={20} />
						{new Intl.DateTimeFormat("en-IN", {
							hour: "numeric",
							minute: "numeric",
						}).format(new Date(match_date))}
					</p>
				</div>

				<Button onClick={handlePickPlayers}>Create Team</Button>
			</div>
		</ViewTransition>
	);
};

MatchListItem.Image = (props: ComponentPropsWithoutRef<"img">) => {
	return (
		<img
			{...props}
			className={cn("aspect-square w-12 object-cover", props.className)}
		/>
	);
};
