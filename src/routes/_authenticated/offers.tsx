import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/offers")({
	staticData: {
		getTitle: () => "Offers",
	},
});
