import { mutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CategoryFormType } from "@/features/category/types";
import { handleApiError } from "@/lib/utils";
import { createCategory, deleteCategoryById, editCategoryById } from "../api";

export function categoryMutationOptions({
	isEdit,
	categoryId,
}: {
	isEdit: boolean;
	categoryId?: string;
}) {
	return mutationOptions({
		mutationFn: (value: CategoryFormType) => {
			if (isEdit && categoryId) {
				return editCategoryById(categoryId, value);
			}

			return createCategory(value);
		},
	});
}

export function categoryDeleteMutationOptions() {
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
