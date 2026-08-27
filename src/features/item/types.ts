import type { AnyFormApi } from "@tanstack/react-form";
import type { z } from "zod/v4";
import type { Category } from "../category/types";
import type { SelectItems } from "../shared/components/form/select-field";
import type { ModerationStatus } from "../shared/types";
import type { UserSummary } from "../users/types";
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
	onSubmit: ({ value, form }: { value: FormData; form: AnyFormApi }) => void;
};

export type UpdateItemFormValues = z.infer<
	ReturnType<typeof updateItemFormSchema>
>;

export type UpdateItemFormProps = {
	item: ItemType;
	categories: SelectItems;
	onSubmit: ({ value, form }: { value: FormData; form: AnyFormApi }) => void;
};

export type ItemConditionType = z.infer<typeof itemConditionSchema>;
export type ItemFormStateType = z.infer<typeof itemFormStateSchema>;

export type ItemStateType = z.infer<typeof itemStateSchema>;

export type ItemType = {
	id: string;
	title: string;
	description: string;
	city: string;
	moderationStatus: ModerationStatus;
	condition: ItemConditionType;
	state: ItemStateType;
	category: Category;
	owner: UserSummary | null;
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
};

export type ItemCardProps = {
	item: ItemType;
};
export type ItemWithOwnerType = ItemType & { owner: UserSummary };

export type ItemProps = {
	item: ItemWithOwnerType;
};

export type ItemActionsProps = {
	item: ItemWithOwnerType;
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
