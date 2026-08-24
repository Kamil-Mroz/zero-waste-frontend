import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin")({
	head: () => ({
		meta: [
			{
				title: "Admin",
			},
		],
	}),
	staticData: {
		getTitle: () => "Admin",
	},
	beforeLoad: ({ context, location }) => {
		if (!context.auth.hasAnyRole(["ADMIN", "DEMO"])) {
			throw redirect({
				to: "/unauthorized",
				search: {
					redirect: location.href,
				},
			});
		}
	},
});
