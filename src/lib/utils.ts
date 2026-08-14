import type { AnyFormApi } from "@tanstack/react-form";
import axios, { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CategoryTreeType } from "@/features/category/types";
import { DEFAULT_PAGEABLE } from "@/features/shared/constants";
import type { Pageable } from "@/features/shared/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export interface ProblemDetail {
	type?: string;
	title?: string;
	status?: number;
	detail?: string;
	instance?: string;
	errors?: Record<
		string,
		{
			message: string;
		}
	>;
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
    const { status, data } = error.response;

    if (status === 429) {
      return "Too many login attempts. Please try again later.";
    }

    if (typeof data === "object" && data !== null) {
      const apiError = data as ApiError;

      if (apiError.errors && form) {
        form.setErrorMap({
          onSubmit: { fields: apiError.errors },
        });
        return;
      }

      if (apiError.detail) {
        return apiError.detail;
      }
    }

    return "Something went wrong, please try again.";
  }

  return "Something went wrong, please try again.";
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

export function getErrorDetails(error: unknown) {
	if (axios.isAxiosError<ProblemDetail>(error)) {
		const problem = error.response?.data;

		return {
			status: problem?.status ?? error.response?.status,
			title: problem?.title ?? "Request Failed",
			message: problem?.detail ?? error.message,
			fieldErrors: problem?.errors,
		};
	}

	if (error instanceof Error) {
		return {
			status: undefined,
			title: "Unexpected Error",
			message: error.message,
			fieldErrors: undefined,
		};
	}

	return {
		status: undefined,
		title: "Unexpected Error",
		message: "Something went wrong.",
		fieldErrors: undefined,
	};
}
