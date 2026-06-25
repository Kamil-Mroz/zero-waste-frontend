import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_writer/eco-hub")({
	staticData: {
		getTitle: () => "Eco Hub",
	},
	component: Outlet,
});
