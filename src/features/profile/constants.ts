export const PROFILE_QUERY_KEYS = {
	all: ["profiles"],
	publicProfileRoot: () => [...PROFILE_QUERY_KEYS.all, "public"],
	byId: (id: string) => [...PROFILE_QUERY_KEYS.publicProfileRoot(), id],
} as const;
