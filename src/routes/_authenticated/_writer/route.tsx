import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_writer")({
	staticData: {
		getTitle: () => "Writer",
	},
	beforeLoad: ({ context, location }) => {
		if (!context.auth.hasAnyRole(["WRITER", "ADMIN"])) {
			throw redirect({
				to: "/unauthorized",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: Outlet,
});
