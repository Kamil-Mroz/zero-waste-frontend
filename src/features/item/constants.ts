export const ITEM_CONDITION = [
	{ value: "NEW", label: "New" },
	{ value: "REPAIRED", label: "Repaired" },
	{ value: "DAMAGED", label: "Damaged" },
	{ value: "OLD", label: "Old" },
] as const;

export const ITEM_QUERY_KEYS = {
	all: ["items"],
	byId: (id: string) => [...ITEM_QUERY_KEYS.all, id],
	own: () => [...ITEM_QUERY_KEYS.all, "own"],
} as const;

export const itemDialogConfig = {
	delete: {
		title: "Delete Item",
		description: "Permanently delete item. This action cannot be undone.",
	},

	empty: {
		title: "",
		description: "",
	},
} as const;
