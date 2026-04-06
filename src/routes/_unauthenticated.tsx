import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_unauthenticated")({
	validateSearch: (search) => ({
		redirect: (search.redirect as string) || "/",
	}),
	beforeLoad: ({ context, search }) => {
		if (context.auth.isAuthenticated) {
			throw redirect({ to: search.redirect });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="min-h-screen grid place-items-center">
			<Outlet />
		</div>
	);
}
