import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin")({
	staticData: {
		getTitle: () => "Admin",
	},
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
});
