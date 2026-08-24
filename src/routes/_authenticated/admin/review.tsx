import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/review")({
	head: () => ({
		meta: [
			{
				title: "Reviews",
			},
		],
	}),
	staticData: {
		getTitle: () => "Manage reviews",
	},
});

