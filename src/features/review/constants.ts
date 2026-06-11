import type { Pageable } from "../shared/types";

export const REVIEW_QUERY_KEYS = {
	all: ["reviews"],
	byUserRoot: () => [...REVIEW_QUERY_KEYS.all, "user"],
	byUserId: (userId: string, search: Partial<Pageable>) => [
		...REVIEW_QUERY_KEYS.byUserRoot(),
		userId,
		search,
	],
	receivedRoot: () => [...REVIEW_QUERY_KEYS.all, "received"],
	received: (search: Partial<Pageable>) => [
		...REVIEW_QUERY_KEYS.receivedRoot(),
		search,
	],
	givenRoot: () => [...REVIEW_QUERY_KEYS.all, "given"],
	given: (search: Partial<Pageable>) => [
		...REVIEW_QUERY_KEYS.givenRoot(),
		search,
	],
} as const;
