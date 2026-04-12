import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/marketplace")({
	staticData: {
		getTitle: () => "Marketplace",
	},
	component: () => <Outlet />,
});
