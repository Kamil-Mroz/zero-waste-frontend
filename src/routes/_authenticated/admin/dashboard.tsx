import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/dashboard")({
	staticData: {
		getTitle: () => "Dashboard",
	},
});
