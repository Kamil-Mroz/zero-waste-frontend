import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useAppForm } from "@/features/shared/components/form/form";
import { appToast } from "@/features/shared/components/toast";
import { handleApiError } from "@/lib/utils";
import { BLOG_QUERY_KEYS } from "../constants";
import { blogFormSchema } from "../schemas";
import type { BlogType } from "../types";
import { useBlogMutation } from "./mutation-options";

export const useBlogForm = (blog?: BlogType) => {
	const client = useQueryClient();
	const router = useRouter();
	const navigate = useNavigate();
	const mutation = useBlogMutation(blog);
	return useAppForm({
		defaultValues: {
			title: blog?.title ?? "",
			description: blog?.description ?? "",
			content: blog?.content ?? "",
		},
		validators: {
			onSubmit: blogFormSchema,
		},
		onSubmit: async ({ value, formApi }) => {
			try {
				await mutation.mutateAsync(value);

				await Promise.all([
					client.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.own() }),

					...(blog
						? [
								client.invalidateQueries({
									queryKey: BLOG_QUERY_KEYS.byId(blog.id),
								}),
							]
						: []),
				]);
				await router.invalidate();

				formApi.reset();
				if (blog) {
					navigate({
						to: "/eco-hub/blogs/$blogId",
						params: { blogId: blog.id },
					});
				} else {
					navigate({ to: "/eco-hub/blogs/own" });
				}
			} catch (error) {
				const message = handleApiError(error, formApi);
				if (message)
					appToast.error({
						title: "Blog form failed",
						description: message,
					});
			}
		},
	});
};
