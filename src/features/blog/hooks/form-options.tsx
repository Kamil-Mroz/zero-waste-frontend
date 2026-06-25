import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useAppForm } from "@/features/shared/components/form/form";
import { appToast } from "@/features/shared/components/toast";
import { handleApiError } from "@/lib/utils";
import { BLOG_QUERY_KEYS } from "../constants";
import { createBlogFormSchema } from "../schemas";
import { useCreateBlogMutation } from "./mutation-options";

export const useCreateBlogForm = () => {
	const client = useQueryClient();
	const router = useRouter();
	const navigate = useNavigate();
	const mutation = useCreateBlogMutation();
	return useAppForm({
		defaultValues: {
			title: "",
			description: "",
			content: "",
		},
		validators: {
			onSubmit: createBlogFormSchema,
		},
		onSubmit: async ({ value, formApi }) => {
			try {
				await mutation.mutateAsync(value);

				await Promise.all([
					client.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.own() }),
				]);
				await router.invalidate();

				formApi.reset();

				navigate({ to: "/eco-hub/blogs/own" });
			} catch (error) {
				const message = handleApiError(error, formApi);
				if (message)
					appToast.error({
						title: "Blog failed",
						description: message,
					});
			}
		},
	});
};
