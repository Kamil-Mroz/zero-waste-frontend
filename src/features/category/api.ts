import { api } from "@/lib/axios";
import type { Category, CategoryFormType, CategoryTreeType } from "./types";

export const fetchCategories = async () => {
	const res = await api.get<Category[]>(`/v1/categories`);
	return res.data.map((category) => ({
		label: category.name,
		value: category.id,
	}));
};

export const fetchCategoryById = async (id: string) => {
	const res = await api.get<Category>(`/v1/categories/${id}`);
	return res.data;
};

export const fetchCategoryTree = async () => {
	const res = await api.get<CategoryTreeType[]>(`/v1/categories/tree`);
	return res.data;
};

export const editCategoryById = (id: string, value: CategoryFormType) => {
	return api.put(`/v1/categories/${id}`, value);
};

export const createCategory = (value: CategoryFormType) => {
	return api.post("/v1/categories", {
		...value,
		categoryId: value.categoryId || null,
	});
};

export const deleteCategoryById = (id: string) => {
	return api.delete(`/v1/categories/${id}`);
};
