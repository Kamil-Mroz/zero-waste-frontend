import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { NotFound } from "@/features/shared/components/not-found";

export const Route = createFileRoute("/_authenticated/admin")({
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
