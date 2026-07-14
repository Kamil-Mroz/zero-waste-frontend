import type { z } from "zod/v4";
import type { Category } from "../category/types";
import type { SelectItems } from "../shared/components/form/select-field";
import type { Page, Pageable } from "../shared/types";
import type { User } from "../users/types";
import type {
	baseItemSearchSchema,
	createItemFormSchema,
	itemConditionSchema,
	itemFormStateSchema,
	itemStateSchema,
	ownItemSearchSchema,
	updateItemFormSchema,
} from "./schemas/item.schema";

export type CreateItemFormValues = z.infer<typeof createItemFormSchema>;

export type CreateItemFormProps = {
	categories: SelectItems;
	onSubmit: (values: FormData) => void;
};

export type UpdateItemFormValues = z.infer<
	ReturnType<typeof updateItemFormSchema>
>;

export type UpdateItemFormProps = {
	item: ItemType;
	categories: SelectItems;
	onSubmit: (values: FormData) => void;
};

export type ItemConditionType = z.infer<typeof itemConditionSchema>;
export type ItemFormStateType = z.infer<typeof itemFormStateSchema>;

export type ItemStateType = z.infer<typeof itemStateSchema>;

export type ItemType = {
	id: string;
	title: string;
	description: string;
	city: string;
	condition: ItemConditionType;
	state: ItemStateType;
	category: Category;
	owner: User | null;
	images: Image[];
	thumbnail: Image | null;
};
export type Image = {
	id: string;
	url: string;
	originalName: string;
};

export type ItemListProps = {
	items: ItemType[];
	isOwnItems?: boolean;
};

export type ItemCardProps = {
	item: ItemType;
};
export type ItemWithOwnerType = ItemType & { owner: User };

export type ItemProps = {
	item: ItemWithOwnerType;
};

export type ItemActionsProps = {
	item: ItemWithOwnerType;
	isOwner: boolean;
	isAuthenticated: boolean;
};
export type ItemDeleteDialogProps = {
	id: string;
	onDone: () => void;
};
export type ItemOfferDialogProps = {
	id: string;
	onDone: () => void;
};

export type ItemsQueryOptions = z.infer<typeof baseItemSearchSchema>;
export type OwnItemsQueryOptions = z.infer<typeof ownItemSearchSchema>;
