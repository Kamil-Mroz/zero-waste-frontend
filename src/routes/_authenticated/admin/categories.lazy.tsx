import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/admin/categories")({
	component: () => <Outlet />,
});
