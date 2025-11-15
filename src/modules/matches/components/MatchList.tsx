import { useNavigate } from "@tanstack/react-router";
import { Add, Calendar, Clock } from "iconsax-react";
import type { ComponentPropsWithoutRef } from "react";
import { startTransition, ViewTransition } from "@/components/transition";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetMatches } from "@/modules/player/hooks/queries";
import { useDraftStore } from "@/modules/player/store";
import { Route } from "@/routes/matches";
import type { MatchDetails } from "../api";

export const MatchList = () => {
	const { matches } = useGetMatches();
	const { sport } = Route.useSearch();

	const match = matches[sport as keyof typeof matches];

	return (
		<div className="flex flex-col gap-4">
			{sport?.length > 0
				? match.map((match) => (
						<div key={match.id} className="p-2 space-y-2">
							<MatchListItem {...match} />
						</div>
					))
				: Object.entries(matches).map(([title, matchs]) => (
						<div key={title}>
							<p className="capitalize text-2xl">{title}</p>
							<ul className="p-2 space-y-2">
								{matchs.map((match) => (
									<MatchListItem key={match.id} {...match} />
								))}
							</ul>
						</div>
					))}
		</div>
	);
};

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
					<MatchListItem.Team
						shortName={t1_short_name}
						name={t1_name}
						image={t1_image}
					/>

					<p className="text-muted-foreground">VS</p>

					<MatchListItem.Team
						shortName={t2_short_name}
						name={t2_name}
						image={t2_image}
					/>
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

				<Button onClick={handlePickPlayers}>
					<Add color="black" />
					Create Team
				</Button>
			</div>
		</ViewTransition>
	);
};

interface MatchListItemTeamProps {
	shortName: string;
	name: string;
	image: string;
}

MatchListItem.Team = (props: MatchListItemTeamProps) => {
	const { shortName, name, image } = props;
	return (
		<span className="flex items-center gap-2">
			<ViewTransition name={`match-image-${image}`}>
				<MatchListItem.Image src={image} alt={name} />
			</ViewTransition>
			<p className="sm:hidden">{shortName}</p>
			<p className="hidden sm:block">{name}</p>
		</span>
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
