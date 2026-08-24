import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
	"/_authenticated/admin/reviews/$reviewId",
)({
	component: Outlet,
});
