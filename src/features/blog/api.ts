import { api } from "@/lib/axios";
import type { CreateBlogFormValues } from "./types";

export async function createBlog(values: CreateBlogFormValues) {
	const res = await api.post(`/v1/blogs`, values);
	return res.data;
}
