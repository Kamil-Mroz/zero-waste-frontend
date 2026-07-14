import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { createBlog, deleteBlog, updateBlog } from "../api";
import { BLOG_QUERY_KEYS } from "../constants";
import type { BlogFormValues, BlogType } from "../types";

export function useBlogMutation(blog?: BlogType) {
	return useMutation({
		mutationFn: (values: BlogFormValues) =>
			blog ? updateBlog(blog.id, values) : createBlog(values),
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
