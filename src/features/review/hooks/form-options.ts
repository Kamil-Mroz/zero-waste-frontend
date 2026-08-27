import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useAppForm } from "@/features/shared/components/form/form";
import { REVIEW_QUERY_KEYS } from "../constants";
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
				await mutation.mutateAsync({ value, form: formApi });

				await Promise.all([
					client.invalidateQueries({ queryKey: REVIEW_QUERY_KEYS.givenRoot() }),
				]);
				await router.invalidate();

				formApi.reset();

				navigate({ to: "/reviews/given", replace: true });
			} catch {}
		},
	});
};
