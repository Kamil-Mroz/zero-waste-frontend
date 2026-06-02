export const CATEGORY_QUERY_KEYS = {
	all: ["categories"],
	byId: (id: string) => [...CATEGORY_QUERY_KEYS.all,"detail", id],
	tree: ["categoryTree"],
} as const;


export const categoryDialogConfig = {
	create: {
		title: "Create Category",
		description:
			"Create a new category.",
	},
	edit: {
		title: "Update Category",
		description:
			"Update the selected category's information.",
	},
	delete: {
		title: "Delete Category",
		description:
			"Permanently delete category. This action cannot be undone.",
	},

	empty: {
		title: "",
		description: "",
	},
} as const;
