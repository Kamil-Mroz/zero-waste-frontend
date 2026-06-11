import { useMutation } from "@tanstack/react-query";
import type { CreateReviewFormValues } from "../types";
import { createReview } from "../api";

export function useCreateReviewMutation() {
	return useMutation({
		mutationFn: (values: CreateReviewFormValues) =>
			createReview(values),
	});
}
