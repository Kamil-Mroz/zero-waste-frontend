import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/reviews")({
	head: () => ({
		meta: [
			{
				title: "Reviews",
			},
		],
	}),
	staticData: {
		getTitle: () => "Reviews",
	},
});
