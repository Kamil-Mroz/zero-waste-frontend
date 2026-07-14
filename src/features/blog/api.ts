import { api } from "@/lib/axios";
import type { BlogFormValues, BlogType } from "./types";

export async function createBlog(values: BlogFormValues) {
	const res = await api.post(`/v1/blogs`, values);
	return res.data;
}

export async function updateBlog(id: string, values: BlogFormValues) {
	const res = await api.put(`/v1/blogs/${id}`, values);
	return res.data;
}

export async function fetchBlogs() {
	const res = await api.get<BlogType[]>("/v1/blogs");
	return res.data;
}

export async function fetchBlog(id: string) {
	const res = await api.get<BlogType>(`/v1/blogs/${id}`);
	return res.data;
}

export async function fetchOwnBlogs() {
	const res = await api.get<BlogType[]>("/v1/blogs/own");
	return res.data;
}

export async function deleteBlog(id: string) {
	await api.delete(`/v1/blogs/${id}`);
}
