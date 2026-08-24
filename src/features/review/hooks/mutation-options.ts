import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { appToast } from "@/features/shared/components/toast";
import { userQueryOptions } from "@/features/users/hooks/query-options";
import { handleApiError } from "@/lib/utils";
import { createReview, deleteReview } from "../api";
import { REVIEW_QUERY_KEYS } from "../constants";
import type { CreateReviewFormValues } from "../types";

export function useCreateReviewMutation() {
	return useMutation({
		mutationFn: (values: CreateReviewFormValues) => createReview(values),
	});
}

export function useReviewDeleteMutation() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteReview,
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Failed to delete", description: message });
			}
		},

		onSuccess: async (_, id) => {
			appToast.success({
				title: "Review deleted",
				description: "Review deleted successfully",
			});

			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: REVIEW_QUERY_KEYS.all,
				}),

				queryClient.invalidateQueries({
					queryKey: REVIEW_QUERY_KEYS.byId(id),
				}),
			]);
			await navigate({ to: "/admin/reports", replace: true });
		},
	});
}
