import { queryOptions } from "@tanstack/react-query";
import { fetchBlog, fetchBlogs, fetchOwnBlogs } from "../api";
import { BLOG_QUERY_KEYS } from "../constants";

export const ownBlogsQueryOptions = () =>
	queryOptions({
		queryKey: BLOG_QUERY_KEYS.own(),
		queryFn: fetchOwnBlogs,
	});

export const blogsQueryOptions = () =>
	queryOptions({
		queryKey: BLOG_QUERY_KEYS.all,
		queryFn: fetchBlogs,
	});
export const blogQueryOptions = (id: string) =>
	queryOptions({
		queryKey: BLOG_QUERY_KEYS.byId(id),
		queryFn: async () => fetchBlog(id),
	});
