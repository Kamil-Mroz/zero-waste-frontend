import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/admin/users/$userId")(
	{
		component: Outlet,
	},
);
