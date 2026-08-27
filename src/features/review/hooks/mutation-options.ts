import type { AnyFormApi } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { REPORT_QUERY_KEYS } from "@/features/report/constants";
import { appToast } from "@/features/shared/components/toast";
import { createReview, deleteReview } from "../api";
import { REVIEW_QUERY_KEYS } from "../constants";
import type { CreateReviewFormValues } from "../types";

export function useCreateReviewMutation() {
	return useMutation({
		mutationFn: ({
			value,
		}: {
			value: CreateReviewFormValues;
			form: AnyFormApi;
		}) => createReview(value),
	});
}

export function useReviewDeleteMutation() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { hasRole } = useAuth();
	const isAdmin = hasRole("ADMIN");
	return useMutation({
		mutationFn: deleteReview,

		onSuccess: async (_, id) => {
			appToast.success({
				title: "Review deleted",
				description: "Review deleted successfully",
			});

			queryClient.removeQueries({
				queryKey: REVIEW_QUERY_KEYS.byId(id),
			});

			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: REVIEW_QUERY_KEYS.all,
				}),
				...(isAdmin
					? [
							queryClient.invalidateQueries({
								queryKey: REPORT_QUERY_KEYS.all,
							}),
						]
					: []),
			]);

			hasRole("ADMIN") &&
				(await navigate({ to: "/admin/reports", replace: true }));
		},
	});
}
