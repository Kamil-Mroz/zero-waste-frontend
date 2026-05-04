import { formOptions } from "@tanstack/react-form";
import {
	createItemFormSchema,
	updateItemFormSchema,
} from "../schemas/item.schema";
import type { UpdateItemFormValues } from "../types";

export const createItemFormOptions = () =>
	formOptions({
		defaultValues: {
			title: "Test item",
			description: "This is a test item for dev",
			condition: "NEW",
			categoryId: "",
			city: "Texas",
			images: [] as File[],
		},
		validators: {
			onSubmit: createItemFormSchema,
		},
	});

export const updateItemFormOptions = (
	defaultValues: UpdateItemFormValues,
	currentImageIds: string[],
) =>
	formOptions({
		defaultValues: defaultValues,

		validators: {
			onSubmit: updateItemFormSchema(currentImageIds),
		},
	});
