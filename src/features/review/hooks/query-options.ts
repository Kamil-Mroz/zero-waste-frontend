import { queryOptions } from "@tanstack/react-query";
import type { Pageable } from "@/features/shared/types";
import { getGivenReviews, getReceivedReviews, getUserReviews } from "../api";
import { REVIEW_QUERY_KEYS } from "../constants";

export const userReviewsQueryOptions = (
	userId: string,
	search: Partial<Pageable>,
) =>
	queryOptions({
		queryKey: REVIEW_QUERY_KEYS.byUserId(userId, search),
		queryFn: async () => getUserReviews(userId, search),
	});

export const ReceivedReviewsQueryOptions = (search: Partial<Pageable>) =>
	queryOptions({
		queryKey: REVIEW_QUERY_KEYS.received(search),
		queryFn: async () => getReceivedReviews(search),
	});

export const GivenReviewsQueryOptions = (search: Partial<Pageable>) =>
	queryOptions({
		queryKey: REVIEW_QUERY_KEYS.given(search),
		queryFn: async () => getGivenReviews(search),
	});
