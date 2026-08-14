import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/offers")({
	head: () => ({
		meta: [
			{
				title: "Offers",
			},
		],
	}),
	staticData: {
		getTitle: () => "Offers",
	},
});
