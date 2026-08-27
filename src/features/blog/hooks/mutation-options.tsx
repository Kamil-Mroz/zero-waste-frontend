import type { AnyFormApi } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { createBlog, deleteBlog, updateBlog } from "../api";
import { BLOG_QUERY_KEYS } from "../constants";
import type { BlogFormValues, BlogType } from "../types";

export function useBlogMutation(blog?: BlogType) {
	return useMutation({
		mutationFn: ({ value }: { value: BlogFormValues; form: AnyFormApi }) =>
			blog ? updateBlog(blog.id, value) : createBlog(value),
	});
}

export function useBlogDeleteMutation() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: deleteBlog,
		onSuccess: async (_, id) => {
			queryClient.removeQueries({ queryKey: BLOG_QUERY_KEYS.byId(id) });
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.all }),
				queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.own() }),
			]);

			await navigate({ to: "/eco-hub/blogs/own" });
		},
	});
}
