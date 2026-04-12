import { api } from "@/lib/axios";
import type { Category, CategoryTreeType } from "./types";

export const fetchCategories = async () => {
	const res =
		await api.get<Category[]>(`/api/v1/categories`);
	return res.data.map((category) => ({
		label: category.name,
		value: category.id,
	}));
};

export const fetchCategoryById = async (id: string) => {
	const res = await api.get<Category>(`/api/v1/categories/${id}`);
	return res.data;
};

export const fetchCategoryTree = async () => {
	const res = await api.get<CategoryTreeType[]>(`/api/v1/categories/tree`);
	return res.data;
};
