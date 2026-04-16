import { formOptions } from "@tanstack/react-form";
import { itemFormSchema } from "../schemas/item.schema";
import type { ItemFormRequest } from "../types";

export const itemFormOptions = (defaultValues?: ItemFormRequest) =>
	formOptions({
		defaultValues: defaultValues ?? {
			title: "Test item",
			description: "This is a test item for dev",
			condition: "NEW",
			categoryId: "",
			city: "Texas",
		},
		validators: {
			onSubmit: itemFormSchema,
		},
	});
