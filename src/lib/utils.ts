import type { AnyFormApi } from "@tanstack/react-form";
import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CategoryTreeType } from "@/features/category/types";
import { DEFAULT_PAGEABLE } from "@/features/shared/constants";
import type { Pageable } from "@/features/shared/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type ApiError = {
	detail: string;
	instance: string;
	status: number;
	title: string;
	errors?: Record<string, { message: string }>;
};

export const handleApiError = (
	error: unknown,

	form?: AnyFormApi,
) => {
	if (error instanceof AxiosError && error.response) {
		const data = error.response.data as ApiError;

		if (data.errors && form) {
			form.setErrorMap({
				onSubmit: { fields: data.errors },
			});
			return;
		}
		return data.detail;
	}
	return "Something went wrong, please try again";
};

export const withDefaultPageable = (value?: Partial<Pageable>): Pageable => ({
	page: value?.page ?? DEFAULT_PAGEABLE.page,
	size: value?.size ?? DEFAULT_PAGEABLE.size,
});

export const cleanEmptyParams = <T extends Record<string, unknown>>(
	search: T,
) => {
	const newSearch = { ...search };
	Object.keys(newSearch).forEach((key) => {
		const value = newSearch[key];
		if (
			value === undefined ||
			value === "" ||
			(typeof value === "number" && Number.isNaN(value))
		)
			delete newSearch[key];
	});

	if (search.page === DEFAULT_PAGEABLE.page) delete newSearch.page;
	if (search.size === DEFAULT_PAGEABLE.size) delete newSearch.size;

	return newSearch;
};

export function getValidPage(page: number | undefined, totalPages: number) {
	const lastPage = Math.max(0, totalPages - 1);
	if (page !== undefined && page > lastPage) {
		return lastPage;
	}
	return null;
}

export const flattenCategories = (
	categories: CategoryTreeType[],
): CategoryTreeType[] => {
	return categories.flatMap((category) => [
		category,
		...flattenCategories(category.children),
	]);
};
