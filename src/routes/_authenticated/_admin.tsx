import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_admin")({
	beforeLoad: ({ context, location }) => {
		if (!context.auth.hasRole("ADMIN")) {
			throw redirect({
				to: "/unauthorized",
				search: {
					redirect: location.href,
				},
			});
		}
	},

	component: () => <Outlet />,
	staticData: {
		getTitle: () => "Admin",
	},
});
