import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_writer/eco-hub")({
	head: () => ({
		meta: [
			{
				title: "Eco Hub",
			},
		],
	}),
	staticData: {
		getTitle: () => "Eco Hub",
	},
});
