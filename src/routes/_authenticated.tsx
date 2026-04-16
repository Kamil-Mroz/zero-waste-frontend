import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { NotFound } from "@/features/shared/components/not-found";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: ({ context, location }) => {
		if (!context.auth.isLoading && !context.auth.user) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: () => <Outlet />,
});
