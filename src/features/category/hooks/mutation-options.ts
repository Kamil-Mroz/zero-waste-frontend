import type { AnyFormApi } from "@tanstack/react-form";
import { mutationOptions } from "@tanstack/react-query";
import type { CategoryFormType } from "@/features/category/types";
import { createCategory, deleteCategoryById, editCategoryById } from "../api";

export function createCategoryMutationOptions() {
	return mutationOptions({
		mutationFn: ({ value }: { value: CategoryFormType; form: AnyFormApi }) =>
			createCategory(value),
	});
}
export function updateCategoryMutationOptions(id: string) {
	return mutationOptions({
		mutationFn: ({ value }: { value: CategoryFormType; form: AnyFormApi }) =>
			editCategoryById(id, value),
	});
}

export function deleteCategoryMutationOptions() {
	return mutationOptions({
		mutationFn: deleteCategoryById,
	});
}
