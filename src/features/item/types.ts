import type { z } from "zod/v4";
import type { Category } from "../category/types";
import type { SelectItems } from "../shared/components/form/select-field";
import type { itemFormSchema } from "./schemas/item.schema";
import type { User } from "../users/types";

export type ItemFormRequest = z.infer<typeof itemFormSchema>;
export type ItemFormProps = {
	categories: SelectItems;
	defaultValues?: ItemFormRequest;
	onSubmit: (values: ItemFormRequest) => void;
};

export type ItemConditionType = "NEW" | "REPAIRED" | "DAMAGED" | "OLD";

export type ItemStateType = "AVAILABLE" | "GIVEN";

export type ItemType = {
	id: string;
	title: string;
	description: string;
	city: string;
	condition: ItemConditionType;
	state: ItemStateType;
	category: Category;
	owner: User | null;
};

export type ItemListProps = {
	items: ItemType[];
};

export type ItemCardProps = {
	item: ItemType;
};
export type ItemWithOwnerType = ItemType & { owner: User };

export type ItemProps = {
	item: ItemWithOwnerType;
};
