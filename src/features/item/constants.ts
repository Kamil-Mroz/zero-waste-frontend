import type { MultiSelectOption } from "../shared/types";
import type { ItemStateType } from "./types";

export const ITEM_CONDITION = [
	{ value: "NEW", label: "New" },
	{ value: "REPAIRED", label: "Repaired" },
	{ value: "DAMAGED", label: "Damaged" },
	{ value: "OLD", label: "Old" },
] as const;

export const ITEM_QUERY_KEYS = {
	all: ["items"],
	itemRoot: () => [...ITEM_QUERY_KEYS.all, "detail"],
	byId: (id: string) => [...ITEM_QUERY_KEYS.itemRoot(), id],
	own: () => [...ITEM_QUERY_KEYS.all, "own"],
} as const;

export const itemDialogConfig = {
	delete: {
		title: "Delete Item",
		description: "Permanently delete item. This action cannot be undone.",
	},
	offer: {
		title: "Interested in this item?",
		description:
			"The owner will be notified that you're interested in this item.",
	},
	empty: {
		title: "",
		description: "",
	},
} as const;

export const stateOptions: MultiSelectOption<ItemStateType>[] = [
	{ value: "AVAILABLE", label: "Available" },
	{ value: "GIVEN", label: "Given" },
	{ value: "PENDING", label: "Pending" },
] as const;
