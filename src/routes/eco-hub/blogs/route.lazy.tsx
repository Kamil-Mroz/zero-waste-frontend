import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/eco-hub/blogs")({
	component: Outlet,
});
