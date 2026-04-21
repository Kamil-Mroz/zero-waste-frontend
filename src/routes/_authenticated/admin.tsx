import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
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
	component: RouteComponent,
	staticData: {
		getTitle: () => "Admin",
	},
});

function RouteComponent() {
	return <Outlet />;
}
