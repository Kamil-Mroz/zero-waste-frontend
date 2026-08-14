import { createFileRoute } from "@tanstack/react-router";
import { ownItemSearchSchema } from "@/features/item/schemas/item.schema";

export const Route = createFileRoute("/_authenticated/marketplace/my-items")({
	head: () => ({
		meta: [
			{
				title: "My items",
			},
		],
	}),
	validateSearch: ownItemSearchSchema,
	loaderDeps: ({ search }) => {
		const { states, category, page, size, text } = search;
		return { states, category, page, size, text };
	},

	staticData: {
		getTitle: () => "My items",
	},
});
