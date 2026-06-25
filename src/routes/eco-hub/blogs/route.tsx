import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/eco-hub/blogs")({
	component: Outlet,
	staticData: {
		getTitle: () => "Blogs",
	},
});
