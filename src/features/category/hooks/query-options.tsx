import { queryOptions } from "@tanstack/react-query";
import { fetchCategories, fetchCategoryById, fetchCategoryTree } from "../api";
import { CATEGORY_QUERY_KEYS } from "../constants";

export const categoryQueryOptions = (id: string) => {
	return queryOptions({
		queryKey: CATEGORY_QUERY_KEYS.category(id),
		queryFn: async () => fetchCategoryById(id),
	});
};

export const categoriesQueryOptions = () => {
	return queryOptions({
		queryKey: CATEGORY_QUERY_KEYS.all,
		queryFn: async () => fetchCategories(),
	});
};

export const categoryTreeQueryOptions = () => {
	return queryOptions({
		queryKey: CATEGORY_QUERY_KEYS.tree,
		queryFn: async () => fetchCategoryTree(),
	});
};
