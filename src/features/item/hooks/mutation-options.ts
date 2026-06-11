import { mutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { appToast } from "@/features/shared/components/toast";
import { handleApiError } from "@/lib/utils";
import {
	createItem,
	deleteItem,
	hideItem,
	publishItem,
	updateItem,
} from "../api";

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

export function hideItemMutationOptions() {
	return mutationOptions({
		mutationFn: hideItem,
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Hide failed", description: message });
			}
		},
	});
}

export function publishItemMutationOptions() {
	return mutationOptions({
		mutationFn: publishItem,
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Publish failed", description: message });
			}
		},
	});
}
