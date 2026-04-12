import { formOptions } from "@tanstack/react-form";
import { categorySchema } from "../schemas/category.schema";
import type { CategoryFormProps, CategoryFormType } from "../types";

export const categoryFormOptions = (
	defaultValues: CategoryFormProps["defaultValues"],
) =>
	formOptions({
		defaultValues: {
			name: defaultValues?.name ?? "",
			categoryId: defaultValues?.categoryId ?? "",
		} as CategoryFormType,
		validators: {
			onSubmit: categorySchema,
		},
	});
