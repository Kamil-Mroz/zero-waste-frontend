import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/categories")({
	head: () => ({
		meta: [
			{
				title: "Categories",
			},
		],
	}),
	staticData: {
		getTitle: () => "Categories",
	},
});
