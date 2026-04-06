import { createFileRoute, redirect } from "@tanstack/react-router";

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
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_authenticated/_admin"!</div>;
}
