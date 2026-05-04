import { mutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CategoryFormType } from "@/features/category/types";
import { handleApiError } from "@/lib/utils";
import { createCategory, deleteCategoryById, editCategoryById } from "../api";

export function createCategoryMutationOptions() {
	return mutationOptions({
		mutationFn: createCategory,
	});
}
export function updateCategoryMutationOptions(id: string) {
	return mutationOptions({
		mutationFn: (value: CategoryFormType) => editCategoryById(id, value),
	});
}

export function deleteCategoryMutationOptions() {
	return mutationOptions({
		mutationFn: deleteCategoryById,
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				toast.error(message);
			}
		},
	});
}
