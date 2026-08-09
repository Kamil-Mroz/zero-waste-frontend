import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/_writer/eco-hub")({
	component: Outlet,
});
