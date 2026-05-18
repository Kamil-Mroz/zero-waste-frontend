import { mutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/lib/utils";
import { createItem, deleteItem, showInterestInItem, updateItem } from "../api";

export function createItemMutationOptions() {
	return mutationOptions({
		mutationFn: createItem,
	});
}

export function updateItemMutationOptions(id: string) {
	return mutationOptions({
		mutationFn: (values: FormData) => updateItem(id, values),
	});
}

export function deleteItemMutationOptions() {
	return mutationOptions({
		mutationFn: deleteItem,
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				toast.error(message);
			}
		},
	});
}

export function showInterestInItemMutationOptions(id: string) {
	return mutationOptions({
		mutationFn: () => showInterestInItem(id),
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				toast.error(message);
			}
		},
	});
}
