import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/marketplace")({
	staticData: {
		getTitle: () => "Marketplace",
	},
});
