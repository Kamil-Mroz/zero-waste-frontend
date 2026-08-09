import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/users")({
	staticData: {
		getTitle: () => "Manage users",
	},
});
