import { useMutation } from "@tanstack/react-query";
import { createBlog } from "../api";
import type { CreateBlogFormValues } from "../types";

export function useCreateBlogMutation() {
	return useMutation({
		mutationFn: (values: CreateBlogFormValues) => createBlog(values),
	});
}
