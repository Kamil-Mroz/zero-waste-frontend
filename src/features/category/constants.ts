export const CATEGORY_QUERY_KEYS = {
	all: ["categories"],
	category: (id: string) => [...CATEGORY_QUERY_KEYS.all, id],
	tree: ["categoryTree"],
} as const;
