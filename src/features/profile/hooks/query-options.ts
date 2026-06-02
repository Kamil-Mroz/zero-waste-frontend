import { queryOptions } from "@tanstack/react-query";
import { fetchPublicUserProfile } from "../api";
import { PROFILE_QUERY_KEYS } from "../constants";

export const publicUserProfileQueryOptions = (userId: string) =>
	queryOptions({
		queryKey: PROFILE_QUERY_KEYS.byId(userId),
		queryFn: async () => fetchPublicUserProfile(userId),
		// staleTime: 30_000,
	});
