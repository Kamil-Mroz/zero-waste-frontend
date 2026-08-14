import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/marketplace")({
	head: () => ({
		meta: [
			{
				title: "Marketplace",
			},
		],
	}),
	staticData: {
		getTitle: () => "Marketplace",
	},
	component: () => <Outlet />,
});
