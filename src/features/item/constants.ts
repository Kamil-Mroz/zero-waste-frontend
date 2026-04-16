export const ITEM_CONDITION = [
	{ value: "NEW", label: "New" },
	{ value: "REPAIRED", label: "Repaired" },
	{ value: "DAMAGED", label: "Damaged" },
	{ value: "OLD", label: "Old" },
];

export const ITEM_QUERY_KEYS = {
	all: ["items"],
	byId: (id: string) => [...ITEM_QUERY_KEYS.all, id],
	own: () => [...ITEM_QUERY_KEYS.all, "own"],
} as const;
