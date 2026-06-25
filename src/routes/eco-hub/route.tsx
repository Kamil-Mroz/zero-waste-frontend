import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/eco-hub")({
	staticData: {
		getTitle: () => "Eco Hub",
	},
	component: Outlet,
});
