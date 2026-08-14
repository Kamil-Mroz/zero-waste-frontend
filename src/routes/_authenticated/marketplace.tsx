import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/marketplace")({
	head: () => ({
		meta: [
			{
				title: "Marketplace",
			},
		],
	}),
	staticData: {
		getTitle: () => "Marketplace",
	},
});
