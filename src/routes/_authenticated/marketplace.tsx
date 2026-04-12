import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/marketplace")({
	staticData: {
		getTitle: () => "Marketplace",
	},
	component: () => <Outlet />,
});
