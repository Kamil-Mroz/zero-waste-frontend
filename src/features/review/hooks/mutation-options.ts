import { useMutation } from "@tanstack/react-query";
import { createReview, deleteReview } from "../api";
import type { CreateReviewFormValues } from "../types";
import { handleApiError } from "@/lib/utils";
import { appToast } from "@/features/shared/components/toast";

export function useCreateReviewMutation() {
	return useMutation({
		mutationFn: (values: CreateReviewFormValues) => createReview(values),
	});
}

export function useReviewDeleteMutation() {
	return useMutation({
		mutationFn: deleteReview,
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Deletion failed", description: message });
			}
		},
	});
}
