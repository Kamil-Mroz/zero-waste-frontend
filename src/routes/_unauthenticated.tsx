import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { redirectSchema } from "@/features/shared/schemas/redirect.schema";

export const Route = createFileRoute("/_unauthenticated")({
	validateSearch: redirectSchema,
	beforeLoad: ({ context, search }) => {
		if (context.auth.user) {
			throw redirect({ to: search.redirect });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-full grid place-items-center">
			<Outlet />
		</div>
	);
}
