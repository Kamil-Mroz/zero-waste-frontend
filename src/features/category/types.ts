import type { AxiosResponse } from "axios";
import type { z } from "zod/v4";
import type { SelectItems } from "../shared/components/form/select-field";
import type { categorySchema } from "./schemas/category.schema";

export type CategoryFormProps = {
	defaultValues?: {
		name: string;
		categoryId?: string;
	};
	blank?: boolean;
	onSubmit: (value: CategoryFormType) => Promise<AxiosResponse>;
	showCategorySelect?: boolean;
	categories?: SelectItems;
};

export type CategoryFormType = z.infer<typeof categorySchema>;

export type Category = {
	id: string;
	name: string;
	parentId: string;
};

export type CategoryTreeType = {
	name: string;
	id: string;
	children: CategoryTreeType[];
};

export type CategoryListProps = {
	categories: CategoryTreeType[];
};
export type CategoryTreeProps = { items: CategoryTreeType[] };

export type CategoryTreeItemProps = {
	item: CategoryTreeType;
};

export type CategoryLeafItemProps = {
	item: CategoryTreeType;
};

export type CategoryActionsProps = {
	category: CategoryTreeType;
};
export type CategoryDeleteDialogProps = {
	id: string;
	onDone: () => void;
};
export type CategoryUpdateDialogProps = {
	id: string;
	onDone: () => void;
};

export type CategoryCreateDialogProps = {
	id?: string;
};
