import { mutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/lib/utils";
import { createItem, deleteItem, updateItem } from "../api";
import { appToast } from "@/features/shared/components/toast";

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
				appToast.error({ title: "Delete failed", description: message });
			}
		},
	});
}
