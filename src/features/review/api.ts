import { api } from "@/lib/axios";
import type { Pageable } from "../shared/types";
import type { CreateReviewFormValues, Review, ReviewResponse } from "./types";

export async function createReview(values: CreateReviewFormValues) {
	const res = await api.post(`/v1/reviews`, values);
	return res.data;
}

export async function deleteReview(id: string) {
	const res = await api.delete(`/v1/reviews/${id}`);
	return res.data;
}

export async function getReview(id: string) {
	const res = await api.get<Review>(`/v1/reviews/${id}`);
	return res.data;
}

export async function getUserReviews(userId: string, page: Partial<Pageable>) {
	const res = await api.get<ReviewResponse>(`/v1/reviews/user/${userId}`, {
		params: page,
	});
	return res.data;
}

export async function getReceivedReviews(page: Partial<Pageable>) {
	const res = await api.get<ReviewResponse>(`/v1/reviews/received`, {
		params: page,
	});
	return res.data;
}

export async function getGivenReviews(page: Partial<Pageable>) {
	const res = await api.get<ReviewResponse>(`/v1/reviews/given`, {
		params: page,
	});
	return res.data;
}
