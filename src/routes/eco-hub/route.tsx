import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/eco-hub")({
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
	component: Outlet,
});
