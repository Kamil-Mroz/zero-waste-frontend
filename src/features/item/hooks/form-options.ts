import { formOptions } from "@tanstack/react-form";
import type { ThumbnailValue } from "@/features/shared/components/form/image-picker-field";
import {
	createItemFormSchema,
	updateItemFormSchema,
} from "../schemas/item.schema";
import type { UpdateItemFormValues } from "../types";

export const createItemFormOptions = () =>
	formOptions({
		defaultValues: {
			title: "",
			description: "",
			condition: "",
			categoryId: "",
			state: "AVAILABLE",
			city: "",
			images: [] as File[],
			thumbnail: null as ThumbnailValue,
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
