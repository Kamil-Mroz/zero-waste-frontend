import { queryOptions } from "@tanstack/react-query";
import type { Pageable } from "@/features/shared/types";
import { getGivenReviews, getReceivedReviews, getReview, getUserReviews } from "../api";
import { REVIEW_QUERY_KEYS } from "../constants";

export const userReviewsQueryOptions = (
	userId: string,
	search: Partial<Pageable>,
) =>
	queryOptions({
		queryKey: REVIEW_QUERY_KEYS.byUserId(userId, search),
		queryFn: async () => getUserReviews(userId, search),
		staleTime: 30 * 60 * 1000,
	});

export const reviewQueryOptions = (reviewId: string) =>
	queryOptions({
		queryKey: REVIEW_QUERY_KEYS.byId(reviewId),
		queryFn: async () => getReview(reviewId),
		staleTime: 30 * 60 * 1000,
	});

export const ReceivedReviewsQueryOptions = (search: Partial<Pageable>) =>
	queryOptions({
		queryKey: REVIEW_QUERY_KEYS.received(search),
		queryFn: async () => getReceivedReviews(search),
		staleTime: 30 * 60 * 1000,
	});

export const GivenReviewsQueryOptions = (search: Partial<Pageable>) =>
	queryOptions({
		queryKey: REVIEW_QUERY_KEYS.given(search),
		queryFn: async () => getGivenReviews(search),
		staleTime: 30 * 60 * 1000,
	});
