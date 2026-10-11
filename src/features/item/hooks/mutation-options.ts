import type { AnyFormApi } from "@tanstack/react-form";
import { mutationOptions } from "@tanstack/react-query";
import {
	createItem,
	deleteItem,
	hideItem,
	publishItem,
	updateItem,
} from "../api";
import type { CreateItem, UpdateItem } from "../types";

export function createItemMutationOptions() {
	return mutationOptions({
		mutationFn: ({ value }: { value: CreateItem; form: AnyFormApi }) =>
			createItem(value),
	});
}

export function updateItemMutationOptions(id: string) {
	return mutationOptions({
		mutationFn: ({ value }: { value: UpdateItem; form: AnyFormApi }) =>
			updateItem(id, value),
	});
}

export function deleteItemMutationOptions() {
	return mutationOptions({
		mutationFn: deleteItem,
	});
}

export function hideItemMutationOptions() {
	return mutationOptions({
		mutationFn: hideItem,
	});
}

export function publishItemMutationOptions() {
	return mutationOptions({
		mutationFn: publishItem,
	});
}
