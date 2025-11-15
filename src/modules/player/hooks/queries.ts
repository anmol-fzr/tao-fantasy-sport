import { queryOptions, useQuery } from "@tanstack/react-query";
import { MATCHES, type MatchDetails } from "@/modules/matches/api";
import { PLAYERS } from "../api";

const getMatchesOpts = () => {
	return queryOptions({
		queryKey: ["MATCHES"],
		queryFn: MATCHES.ALL,
	});
};
const getMatchOpts = (matchId: MatchDetails["id"]) => {
	return queryOptions({
		queryKey: ["MATCHES", matchId],
		queryFn: () => MATCHES.ONE(matchId),
	});
};

const useGetMatches = () => {
	const opts = getMatchesOpts();
	const { data, ...rest } = useQuery(opts);

	const matches = data?.data?.matches || {};
	return { matches, data, ...rest };
};

const useGetMatch = (id: MatchDetails["id"]) => {
	const opts = getMatchOpts(id);
	const { data, ...rest } = useQuery(opts);

	return { match: data, ...rest };
};

const getPlayersOpts = () => {
	return queryOptions({
		queryKey: ["PLAYERS"],
		queryFn: PLAYERS.ALL,
	});
};

const useGetPlayers = () => {
	const opts = getPlayersOpts();

	const { data, ...rest } = useQuery(opts);

	const players = data?.data || [];

	return { players, ...rest };
};

export { useGetMatches, useGetMatch, useGetPlayers };
export { getMatchesOpts, getPlayersOpts };
