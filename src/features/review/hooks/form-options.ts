import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useAppForm } from "@/features/shared/components/form/form";
import { appToast } from "@/features/shared/components/toast";
import { handleApiError } from "@/lib/utils";
import { createReviewFormSchema } from "../schemas";
import { useCreateReviewMutation } from "./mutation-options";

export const useCreateReviewForm = (offerId: string) => {
	const client = useQueryClient();
	const router = useRouter();
	const navigate = useNavigate();
	const mutation = useCreateReviewMutation();
	return useAppForm({
		defaultValues: {
			offerId: offerId,
			comment: "",
			rating: 5,
		},
		validators: {
			onSubmit: createReviewFormSchema,
		},
		onSubmit: async ({ value, formApi }) => {
			try {
				await mutation.mutateAsync(value);

				await Promise.all([
					// client.invalidateQueries({ queryKey: USER_QUERY_KEYS.byId(id) }),
				]);
				await router.invalidate();

				formApi.reset();

				navigate({ to: "/reviews" });
			} catch (error) {
				const message = handleApiError(error, formApi);
				if (message)
					appToast.error({
						title: "Review failed",
						description: message,
					});
			}
		},
	});
};
