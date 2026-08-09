import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_writer/eco-hub")({
	staticData: {
		getTitle: () => "Eco Hub",
	},
});
