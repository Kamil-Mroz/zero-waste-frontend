import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/categories")({
	staticData: {
		getTitle: () => "Categories",
	},
});
