import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/reviews")({
	component: Outlet,

});
